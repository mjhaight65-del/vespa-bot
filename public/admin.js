const API = "http://localhost:8001";

function escapeHtml(s){
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

async function load(){
  const leadsEl = document.getElementById("leads");
  const chatsEl = document.getElementById("chats");

  const [leads, chats] = await Promise.all([
    fetch(`${API}/leads`).then(r => r.json()),
    fetch(`${API}/chats`).then(r => r.json())
  ]);

  leadsEl.innerHTML = leads.length ? leads.slice().reverse().map(l => `
    <div style="padding:10px; border-bottom:1px solid rgba(255,255,255,.12)">
      <div><b>${escapeHtml(l.name)}</b> • ${escapeHtml(l.contact)} • <span style="opacity:.75">${escapeHtml(l.intent || "")}</span></div>
      <div style="opacity:.7; font-size:12px;">${escapeHtml(l.timestamp)} • status: ${escapeHtml(l.status || "new")}</div>
    </div>
  `).join("") : `<div class="muted">No leads yet. Type "quote" in the widget and submit info.</div>`;

  const recent = chats.slice(-30).reverse();
  chatsEl.innerHTML = recent.length ? recent.map(c => `
    <div style="padding:10px; border-bottom:1px solid rgba(255,255,255,.12)">
      <div><b>${escapeHtml(c.role)}</b> • <span style="opacity:.75">${escapeHtml(c.session_id)}</span></div>
      <div style="opacity:.9">${escapeHtml(c.message)}</div>
      <div style="opacity:.7; font-size:12px;">${escapeHtml(c.timestamp)}</div>
    </div>
  `).join("") : `<div class="muted">No chats yet.</div>`;
}

load().catch(err => {
  document.getElementById("leads").innerHTML = `<div class="muted">Error loading admin data.</div>`;
  console.error(err);
});
