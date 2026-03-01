(() => {
  const script = document.currentScript;
  const API = script.getAttribute("data-api") || "http://localhost:8001";
  const BRAND = script.getAttribute("data-brand") || "Support";
  const ACCENT = script.getAttribute("data-accent") || "#7c3aed";
  const POSITION = script.getAttribute("data-position") || "right";

  const posStyle = POSITION === "left" ? "left:18px" : "right:18px";
  const css = `
  :root{--w-accent:${ACCENT};}
  .w-btn{position:fixed; bottom:18px; ${posStyle}; z-index:999999;
    width:58px;height:58px;border-radius:18px;border:1px solid rgba(255,255,255,.14);
    background:linear-gradient(135deg,var(--w-accent),rgba(124,58,237,.55));
    box-shadow:0 18px 40px rgba(0,0,0,.28); cursor:pointer; display:flex; align-items:center; justify-content:center;}
  .w-panel{position:fixed; bottom:88px; ${posStyle}; z-index:999999;
    width:min(380px, 92vw); height:520px; border-radius:20px; overflow:hidden;
    border:1px solid rgba(255,255,255,.14);
    background:rgba(12,16,30,.78); backdrop-filter: blur(14px);
    box-shadow:0 24px 60px rgba(0,0,0,.38);
    transform: translateY(10px); opacity:0; pointer-events:none; transition:.18s;}
  .w-panel.open{transform: translateY(0px); opacity:1; pointer-events:auto;}
  .w-top{display:flex; align-items:center; justify-content:space-between;
    padding:12px; border-bottom:1px solid rgba(255,255,255,.12);}
  .w-brand{display:flex; gap:10px; align-items:center; font: 800 14px ui-sans-serif,system-ui; color:rgba(255,255,255,.92);}
  .w-dot{width:10px;height:10px;border-radius:999px;background:var(--w-accent); box-shadow:0 0 18px rgba(124,58,237,.6);}
  .w-x{background:transparent;border:1px solid rgba(255,255,255,.14); color:rgba(255,255,255,.8);
    border-radius:12px; width:34px; height:34px; cursor:pointer;}
  .w-body{padding:14px; height: 392px; overflow:auto; display:flex; flex-direction:column; gap:10px;}
  .w-msg{max-width:88%; padding:10px 12px; border-radius:16px;
    border:1px solid rgba(255,255,255,.12); font: 14px/1.35 ui-sans-serif,system-ui; color:rgba(255,255,255,.9);}
  .w-them{background: rgba(124,58,237,.14);}
  .w-you{background: rgba(56,189,248,.12); align-self:flex-end;}
  .w-foot{display:flex; gap:10px; padding:12px; border-top:1px solid rgba(255,255,255,.12);}
  .w-in{flex:1; padding:12px; border-radius:14px; border:1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06); color:rgba(255,255,255,.9); outline:none;}
  .w-send{padding:12px 14px; border-radius:14px; border:1px solid rgba(255,255,255,.14);
    background: linear-gradient(135deg, var(--w-accent), rgba(124,58,237,.55));
    color:white; font-weight:800; cursor:pointer;}
  .w-hint{font: 12px ui-sans-serif,system-ui; color:rgba(255,255,255,.6); padding:0 14px 12px;}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.className = "w-btn";
  btn.innerHTML = "<svg width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M4 5.5C4 4.12 5.12 3 6.5 3h11C19.88 3 21 4.12 21 5.5v8C21 14.88 19.88 16 18.5 16H10l-4.2 3.2c-.66.5-1.8.02-1.8-.86V5.5Z\" stroke=\"white\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/></svg>";
  document.body.appendChild(btn);

  const panel = document.createElement("div");
  panel.className = "w-panel";
  panel.innerHTML = "<div class=\"w-top\"><div class=\"w-brand\"><span class=\"w-dot\"></span>" + BRAND + "</div><button class=\"w-x\" aria-label=\"Close\">✕</button></div><div class=\"w-body\" id=\"wBody\"></div><div class=\"w-hint\">Tip: type \"quote\" to test lead capture.</div><div class=\"w-foot\"><input class=\"w-in\" id=\"wInput\" placeholder=\"Type your message…\" /><button class=\"w-send\" id=\"wSend\">Send</button></div>";
  document.body.appendChild(panel);

  const body = panel.querySelector("#wBody");
  const input = panel.querySelector("#wInput");
  const send = panel.querySelector("#wSend");

  const storeKey = "w_session_id";
  let sessionId = localStorage.getItem(storeKey) || crypto.randomUUID();
  localStorage.setItem(storeKey, sessionId);

  function addMsg(text, who) {
    who = who || "them";
    const div = document.createElement("div");
    div.className = "w-msg " + (who === "you" ? "w-you" : "w-them");
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  async function callChat(message) {
    const res = await fetch(API + "/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ session_id: sessionId, message: message })
    });
    if (!res.ok) throw new Error("Chat failed: " + res.status);
    return res.json();
  }

  function toggle(open) {
    panel.classList.toggle("open", open);
    if (open) setTimeout(function() { input.focus(); }, 50);
  }

  btn.addEventListener("click", function() { toggle(!panel.classList.contains("open")); });
  panel.querySelector(".w-x").addEventListener("click", function() { toggle(false); });

  async function onSend() {
    const msg = (input.value || "").trim();
    if (!msg) return;
    input.value = "";
    addMsg(msg, "you");

    const thinking = document.createElement("div");
    thinking.className = "w-msg w-them";
    thinking.textContent = "Thinking…";
    body.appendChild(thinking);
    body.scrollTop = body.scrollHeight;

    try {
      const data = await callChat(msg);
      sessionId = data.session_id || sessionId;
      localStorage.setItem(storeKey, sessionId);
      thinking.textContent = data.reply || "Got it.";
    } catch (e) {
      thinking.textContent = "Something went wrong. Refresh and try again.";
      console.error(e);
    }
  }

  send.addEventListener("click", onSend);
  input.addEventListener("keydown", function(e) { if (e.key === "Enter") onSend(); });

  addMsg("Hey — I'm the " + BRAND + " assistant. Want a quote or just have a question?");
})();
