"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Search, Phone, Video, Info, Circle, MoreVertical, Image as ImageIcon } from "lucide-react";
import { mockMessages } from "@/lib/mock-data";

// Detailed mock conversations mapping to each user id
const conversationsMap: Record<string, {
  user: { name: string; avatar: string; role: string; status: "online" | "offline" | "away"; lastSeen?: string };
  messages: Array<{ id: string; role: "me" | "other"; content: string; time: string }>;
}> = {
  m1: {
    user: { name: "Lucas Bernard", avatar: "LB", role: "Graphiste Senior", status: "online" },
    messages: [
      { id: "1", role: "other", content: "Salut Sophie ! J'ai terminé les visuels pour Maison Blanc, ils sont dans la bibliothèque de médias.", time: "10:32" },
      { id: "2", role: "me", content: "Super ! Je vais les valider tout à l'heure. Tu peux commencer à préparer ceux de TechNova ?", time: "10:35" },
      { id: "3", role: "other", content: "Pas de problème. Il me faut juste le brief créa de TechNova. Tu peux me le partager ?", time: "10:36" },
      { id: "4", role: "me", content: "Je te l'envoie dans la bibliothèque. Format 1080x1080 et 1080x1920 comme d'habitude. Merci Lucas !", time: "10:38" },
    ]
  },
  m2: {
    user: { name: "Emma Rousseau", avatar: "ER", role: "Analyste Web & SEO", status: "online" },
    messages: [
      { id: "1", role: "other", content: "Coucou, le rapport mensuel de Flore & Co est prêt à être validé sur la plateforme.", time: "09:15" },
      { id: "2", role: "me", content: "Génial Emma. Les chiffres d'engagement sur Instagram ont augmenté de combien ?", time: "09:20" },
      { id: "3", role: "other", content: "On fait +12.4% d'engagement grâce aux carrousels d'été ! Tous les indicateurs sont au vert.", time: "09:22" },
      { id: "4", role: "me", content: "Formidable, j'envoie le PDF au client dès que j'ai jeté un coup d'œil.", time: "09:25" }
    ]
  },
  m3: {
    user: { name: "Thomas Petit", avatar: "TP", role: "Lead Developer", status: "away" },
    messages: [
      { id: "1", role: "other", content: "Salut Sophie, j'ai besoin de la charte graphique pour TechNova en haute définition (SVG ou PNG HD).", time: "Hier 16:40" },
      { id: "2", role: "me", content: "Je demande ça à l'équipe créative et je te le dépose sur le drive partagé.", time: "Hier 17:00" },
      { id: "3", role: "other", content: "Top, merci. C'est pour intégrer le logo sur le nouveau widget d'aide.", time: "Hier 17:05" }
    ]
  },
  m4: {
    user: { name: "Camille Durand", avatar: "CD", role: "Account Manager", status: "offline", lastSeen: "il y a 2h" },
    messages: [
      { id: "1", role: "other", content: "Les stats du mois de juin sont excellentes pour BioNature ! Le client est super content de notre travail de community management.", time: "Hier 14:10" },
      { id: "2", role: "me", content: "Ah super nouvelle ! Ils veulent renouveler leur contrat de 6 mois du coup ?", time: "Hier 14:15" },
      { id: "3", role: "other", content: "Oui tout à fait. Je prépare l'avenant de facturation et je te l'envoie pour signature.", time: "Hier 14:20" }
    ]
  }
};

export default function MessagesPage() {
  const [activeChatId, setActiveChatId] = useState("m1");
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversationsMap[activeChatId] || conversationsMap.m1;
  const filteredConversations = mockMessages.filter((msg) =>
    msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId, activeChat.messages.length]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Append message dynamically in-memory for presentation
    activeChat.messages.push({
      id: String(activeChat.messages.length + 1),
      role: "me",
      content: input.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    });

    setInput("");
    setTimeout(scrollToBottom, 50);
  };

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, height: "calc(100vh - 110px)" }}>
      
      {/* ── SIDEBAR CONVERSATIONS ── */}
      <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* Search header */}
        <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Messages</h2>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input"
              style={{ paddingLeft: 32, fontSize: 13, height: 36 }}
              placeholder="Rechercher une discussion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Contacts list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredConversations.length === 0 ? (
            <div style={{ padding: "24px 16px", textTransform: "initial", textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>
              Aucune conversation trouvée
            </div>
          ) : (
            filteredConversations.map((msg) => {
              const active = activeChatId === msg.id;
              const details = conversationsMap[msg.id]?.user || { status: "offline" };
              return (
                <div
                  key={msg.id}
                  onClick={() => setActiveChatId(msg.id)}
                  style={{
                    padding: "14px 16px",
                    cursor: "pointer",
                    background: active ? "var(--bg-subtle)" : "transparent",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    transition: "all 0.15s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.015)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Avatar wrapper with status indicator dot */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "linear-gradient(135deg, #2563EB20, #7C3AED20)",
                      border: "1.5px solid rgba(37,99,235,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "#2563EB"
                    }}>
                      {msg.fromAvatar}
                    </div>
                    {/* Status dot */}
                    <div style={{
                      position: "absolute", bottom: -2, right: -2,
                      width: 10, height: 10, borderRadius: "50%",
                      border: "2px solid var(--bg)",
                      background: details.status === "online" ? "#10B981" : details.status === "away" ? "#F59E0B" : "#94A3B8"
                    }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{msg.from}</span>
                      <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {msg.content}
                    </div>
                  </div>

                  {msg.unread && !active && (
                    <div style={{
                      position: "absolute", right: 16, bottom: 16,
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--primary)"
                    }} />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── MAIN DISCUSSION WINDOW ── */}
      <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        {/* Chat window Header */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #2563EB20, #7C3AED20)",
              border: "1.5px solid rgba(37,99,235,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#2563EB"
            }}>
              {activeChat.user.avatar}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{activeChat.user.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-secondary)" }}>
                <span style={{
                  color: activeChat.user.status === "online" ? "#10B981" : activeChat.user.status === "away" ? "#F59E0B" : "var(--text-muted)",
                  fontWeight: 600
                }}>
                  {activeChat.user.status === "online" ? "● En ligne" : activeChat.user.status === "away" ? "● Absent" : "● Hors ligne"}
                </span>
                <span>·</span>
                <span>{activeChat.user.role}</span>
              </div>
            </div>
          </div>

          {/* Top buttons action */}
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-secondary" style={{ width: 34, height: 34, padding: 0, justifyContent: "center" }}>
              <Phone size={14} />
            </button>
            <button className="btn btn-secondary" style={{ width: 34, height: 34, padding: 0, justifyContent: "center" }}>
              <Video size={14} />
            </button>
            <button className="btn btn-secondary" style={{ width: 34, height: 34, padding: 0, justifyContent: "center" }}>
              <Info size={14} />
            </button>
          </div>
        </div>

        {/* Message bubble stream area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 24px",
          background: "var(--bg-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}>
          {activeChat.messages.map((msg) => {
            const isMe = msg.role === "me";
            return (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: 8
                }}
              >
                {/* Other Avatar */}
                {!isMe && (
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "linear-gradient(135deg, #2563EB20, #7C3AED20)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "#2563EB",
                    marginBottom: 4, flexShrink: 0
                  }}>
                    {activeChat.user.avatar}
                  </div>
                )}

                {/* Bubble Container */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start",
                  maxWidth: "65%"
                }}>
                  {/* Bubble */}
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: isMe ? "var(--primary)" : "var(--bg)",
                    color: isMe ? "white" : "var(--text-primary)",
                    border: isMe ? "none" : "1px solid var(--border)",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    wordBreak: "break-word"
                  }}>
                    {msg.content}
                  </div>
                  
                  {/* Time label */}
                  <span style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 4, padding: "0 4px" }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Text Area Footer */}
        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            
            {/* Attachment Actions */}
            <div style={{ display: "flex", gap: 4 }}>
              <button
                title="Joindre un fichier"
                style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                <Paperclip size={14} />
              </button>
              <button
                title="Ajouter un visuel"
                style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                <ImageIcon size={14} />
              </button>
              <button
                title="Émoticônes"
                style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                <Smile size={14} />
              </button>
            </div>

            {/* Input field */}
            <input
              className="input"
              style={{ flex: 1, fontSize: 13, height: 36, paddingLeft: 12 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Écrire à ${activeChat.user.name}...`}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
            />

            {/* Send button */}
            <button
              className="btn btn-primary"
              style={{ width: 36, height: 36, padding: 0, justifyContent: "center", flexShrink: 0 }}
              onClick={handleSendMessage}
            >
              <Send size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
