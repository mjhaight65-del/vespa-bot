from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional
import json
import re
import uuid

app = FastAPI()

# --------- Paths / storage ----------
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
PUBLIC_DIR = BASE_DIR / "public"

LEADS_FILE = DATA_DIR / "leads.json"
CHATS_FILE = DATA_DIR / "chat_sessions.json"
KB_FILE = DATA_DIR / "knowledge_base.json"

DATA_DIR.mkdir(exist_ok=True)
PUBLIC_DIR.mkdir(exist_ok=True)


def _read_json(path: Path, default):
    if not path.exists():
        path.write_text(json.dumps(default, indent=2))
        return default
    try:
        return json.loads(path.read_text())
    except Exception:
        return default


def _write_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2))


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# --------- CORS (helps if you embed on other domains later) ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- Simple in-memory session state ----------
SESSION_STATE = {}
VALID_STAGES = {"open", "collect_name", "collect_contact", "done"}

# --------- Models ----------
class ChatIn(BaseModel):
    session_id: Optional[str] = None
    message: str


class ChatOut(BaseModel):
    session_id: str
    reply: str
    stage: str


class Lead(BaseModel):
    session_id: str
    name: str
    contact: str
    intent: Optional[str] = None


class LeadStatusIn(BaseModel):
    id: str
    status: str


# --------- Helpers ----------
EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
PHONE_RE = re.compile(r"\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b")


def extract_contact(text: str):
    email = EMAIL_RE.search(text)
    if email:
        return email.group(0).strip()
    phone = PHONE_RE.search(text)
    if phone:
        return phone.group(0).strip()
    return None


def get_kb():
    return _read_json(KB_FILE, {
        "business_name": "AI Consulting Lab",
        "greeting": "Hey — I'm the AI assistant. Want a quote or just have a question?",
        "faq": [],
        "lead_offer": "If you want, leave your name + email/phone and I'll follow up."
    })


def log_chat(session_id: str, role: str, message: str):
    chats = _read_json(CHATS_FILE, [])
    chats.append({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": role,
        "message": message,
        "timestamp": now_iso()
    })
    _write_json(CHATS_FILE, chats)


def save_lead(lead: Lead):
    leads = _read_json(LEADS_FILE, [])
    leads.append({
        "id": str(uuid.uuid4()),
        "session_id": lead.session_id,
        "name": lead.name,
        "contact": lead.contact,
        "intent": lead.intent,
        "timestamp": now_iso(),
        "status": "new"
    })
    _write_json(LEADS_FILE, leads)


def ensure_session(session_id: Optional[str]):
    if not session_id:
        session_id = str(uuid.uuid4())
    if session_id not in SESSION_STATE:
        SESSION_STATE[session_id] = {"stage": "open", "name": None, "contact": None, "intent": None}
    return session_id, SESSION_STATE[session_id]


def faq_response(user_text: str, kb: dict):
    text = user_text.lower()
    for item in kb.get("faq", []):
        q = (item.get("q") or "").lower()
        if q and any(word in text for word in q.split()[:4]):
            return item.get("a")
    return None


def detect_intent(user_text: str):
    t = user_text.lower()
    if any(k in t for k in ["quote", "pricing", "price", "cost", "estimate"]):
        return "quote"
    if any(k in t for k in ["book", "appointment", "schedule", "meeting", "call"]):
        return "booking"
    if any(k in t for k in ["support", "help", "issue", "problem"]):
        return "support"
    return None


# --------- API endpoints ----------
@app.get("/health")
def health():
    return {"ok": True, "time": now_iso()}


@app.post("/chat", response_model=ChatOut)
def chat(payload: ChatIn):
    kb = get_kb()

    session_id, state = ensure_session(payload.session_id)
    user_msg = payload.message.strip()

    if not user_msg:
        raise HTTPException(status_code=400, detail="message required")

    log_chat(session_id, "user", user_msg)

    intent = detect_intent(user_msg)
    if intent and not state.get("intent"):
        state["intent"] = intent

    stage = state["stage"]
    trigger_lead_flow = any(k in user_msg.lower() for k in ["quote", "pricing", "contact", "reach", "call me", "text me", "email me"])

    contact = extract_contact(user_msg)
    if contact and not state.get("contact"):
        state["contact"] = contact
        if stage == "open":
            state["stage"] = "collect_name"
            stage = "collect_name"

    if stage == "open":
        maybe = faq_response(user_msg, kb)
        if maybe:
            reply = f"{maybe}\n\n{kb.get('lead_offer')}"
        else:
            if trigger_lead_flow:
                state["stage"] = "collect_name"
                reply = "Perfect — what's your name?"
            else:
                reply = 'Got it. If you want a quote or follow-up, type "quote" and I\'ll grab your name + email/phone.'
        state["stage"] = state["stage"] if state["stage"] in VALID_STAGES else "open"

    elif stage == "collect_name":
        if not extract_contact(user_msg) and len(user_msg.split()) <= 4:
            state["name"] = user_msg
            state["stage"] = "collect_contact"
            reply = "Thanks. What's the best email or phone number to reach you?"
        else:
            if state.get("contact") and not state.get("name"):
                reply = "Got it — and what's your name?"
            else:
                reply = "What name should I put this under?"

    elif stage == "collect_contact":
        contact = extract_contact(user_msg)
        if contact:
            state["contact"] = contact

            if state.get("name") and state.get("contact"):
                lead = Lead(
                    session_id=session_id,
                    name=state["name"],
                    contact=state["contact"],
                    intent=state.get("intent")
                )
                save_lead(lead)
                state["stage"] = "done"
                reply = "Perfect — you're all set ✅ I'll follow up soon. Anything else you want me to note?"
            else:
                reply = "Almost there — what's your name?"

        else:
            reply = "I didn't catch that. Drop an email (name@domain.com) or a 10-digit phone number."

    else:
        maybe = faq_response(user_msg, kb)
        reply = maybe if maybe else "Got it. I saved your info — anything else you need?"

    log_chat(session_id, "assistant", reply)

    return ChatOut(session_id=session_id, reply=reply, stage=state["stage"])


@app.get("/leads")
def get_leads():
    return _read_json(LEADS_FILE, [])


@app.get("/chats")
def get_chats():
    return _read_json(CHATS_FILE, [])


@app.post("/lead/status")
def set_lead_status(payload: LeadStatusIn):
    leads = _read_json(LEADS_FILE, [])
    for l in leads:
        if l.get("id") == payload.id:
            l["status"] = payload.status
            _write_json(LEADS_FILE, leads)
            return {"ok": True}
    raise HTTPException(status_code=404, detail="lead not found")


# --------- Static site ----------
app.mount("/", StaticFiles(directory=str(PUBLIC_DIR), html=True), name="public")
