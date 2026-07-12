"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, RotateCcw, Copy, ThumbsUp, ThumbsDown, Calendar, Video, Megaphone, BookOpen, Layers, Target, HelpCircle, Bot, User, Check, AlertCircle } from "lucide-react";
import { mockClients } from "@/lib/mock-data";

const suggestions = [
  { icon: Calendar,  color: "#2563EB", bg: "#EFF6FF", label: "Calendrier éditorial", prompt: "Crée un calendrier éditorial pour le mois de juillet avec 4 posts par semaine sur Instagram et LinkedIn." },
  { icon: Video,     color: "#7C3AED", bg: "#F5F3FF", label: "Script de Reel / TikTok", prompt: "Écris un script accrocheur pour un Reel Instagram de 30 secondes qui présente notre nouveau produit." },
  { icon: Megaphone, color: "#10B981", bg: "#ECFDF5", label: "Lancement de Campagne", prompt: "Propose une campagne de lancement sur les réseaux sociaux pour une nouvelle collection mode éco-responsable." },
  { icon: BookOpen,  color: "#F59E0B", bg: "#FFFBEB", label: "Séquence de Stories", prompt: "Crée une séquence de 5 Stories Instagram engageantes pour annoncer une promotion de -20%." },
  { icon: Layers,    color: "#0EA5E9", bg: "#F0F9FF", label: "Carrousel LinkedIn", prompt: "Rédige le contenu d'un carrousel LinkedIn en 7 slides sur le thème 'Les tendances du marketing digital en 2026'." },
  { icon: Target,    color: "#EF4444", bg: "#FEF2F2", label: "Copie Publicitaire", prompt: "Écris le copy d'une publicité Facebook avec accroche, description et CTA pour promouvoir un restaurant gastronomique." },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const aiResponses: Record<string, string> = {
  default: `Bien sûr ! Voici une proposition de calendrier éditorial sur mesure :

**Semaine 1 (7-13 juillet)**
- Lundi : Post Instagram — Citation inspirante de marque + Story interactive
- Mercredi : LinkedIn — Article de fond sur les enjeux écologiques du secteur
- Vendredi : TikTok — Vidéo courte des coulisses de préparation en équipe

**Semaine 2 (14-20 juillet)**
- Mardi : Carrousel Instagram — Les 5 astuces clés pour réussir son projet
- Jeudi : Facebook — Témoignage client sous forme de cas pratique
- Samedi : Story interactive — Sondage communauté & FAQ en direct

**Semaine 3 (21-27 juillet)**
- Lundi : LinkedIn — Infographie animée sur l'évolution du marché
- Mercredi : Instagram — Visuel produit valorisant notre offre été
- Vendredi : TikTok — Défi créatif avec participation de notre audience

**Total : 12 publications hautement ciblées.**
*Engagement estimé : +15.4% sur la période.*

Souhaitez-vous que j'ajuste des formats ou que je rédige directement les légendes de ces publications ?`,
};

function TypingAnimation({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const i = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    i.current = 0;
    const interval = setInterval(() => {
      if (i.current < text.length) {
        setDisplayed(text.slice(0, i.current + 1));
        i.current++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 6);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}
      dangerouslySetInnerHTML={{
        __html: displayed
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n/g, "<br/>")
      }}
    />
  );
}

export default function ContenuIAPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [selectedClient, setSelectedClient] = useState(mockClients[0]?.id || "none");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, loading]);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim() || loading) return;

    // Inject context client if selected
    let fullPrompt = prompt;
    if (selectedClient !== "none") {
      const client = mockClients.find(c => c.id === selectedClient);
      if (client) {
        fullPrompt = `[Contexte client: ${client.name} - Secteur: ${client.sector}] ${prompt}`;
      }
    }

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: prompt, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponses.default,
      timestamp: new Date(),
    };
    setLoading(false);
    setTyping(true);
    setMessages((m) => [...m, aiMsg]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isEmpty = messages.length === 0;

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 110px)" }}>
      
      {/* ── HEADER & CLIENT PICKER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexShrink: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={14} color="white" />
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Contenu IA</h1>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>Générez des légendes, scripts et plannings en quelques secondes.</p>
        </div>

        {/* Target Client Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Client cible :</span>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            style={{
              height: 32, padding: "0 10px", borderRadius: 8, border: "1px solid var(--border)",
              background: "var(--bg)", fontSize: 12, fontWeight: 500, color: "var(--text-primary)", outline: "none"
            }}
          >
            <option value="none">Aucun (Générique)</option>
            {mockClients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── CHAT BOX AREA ── */}
      <div className="card" style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, background: "var(--bg-subtle)", marginBottom: 16 }}>
        {isEmpty ? (
          <div style={{ margin: "auto", maxWidth: 620, width: "100%", padding: "20px 0" }}>
            
            {/* Title / Logo */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ display: "inline-flex", padding: 14, borderRadius: 16, background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))", color: "#7C3AED", marginBottom: 16 }}>
                <Sparkles size={34} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>Comment puis-je vous aider ?</h2>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Choisissez une suggestion rapide ci-dessous ou saisissez votre consigne dans la barre de chat.
              </p>
            </div>

            {/* Suggestions Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.prompt)}
                  style={{
                    padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border)",
                    background: "var(--bg)", cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
                    display: "flex", gap: 12, alignItems: "center"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <s.icon size={16} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</span>
                </button>
              ))}
            </div>

          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    width: "100%"
                  }}
                >
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <Bot size={15} color="white" />
                    </div>
                  )}

                  {/* Bubble Content */}
                  <div style={{
                    maxWidth: "75%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start"
                  }}>
                    
                    {/* Text Bubble */}
                    <div style={{
                      padding: "12px 16px",
                      borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: isUser ? "var(--primary)" : "var(--bg)",
                      color: isUser ? "white" : "var(--text-primary)",
                      border: isUser ? "none" : "1px solid var(--border)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.02)"
                    }}>
                      {msg.role === "assistant" && i === messages.length - 1 && typing ? (
                        <TypingAnimation text={msg.content} onComplete={() => setTyping(false)} />
                      ) : (
                        <div
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{
                            __html: msg.content
                              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                              .replace(/\n/g, "<br/>")
                          }}
                        />
                      )}
                    </div>

                    {/* Actions Bar for AI Response */}
                    {!isUser && (
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <button
                          onClick={() => handleCopy(msg.content, i)}
                          style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg)", cursor: "pointer", fontSize: 11, color: "var(--text-secondary)", transition: "all 0.1s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; }}
                        >
                          <Copy size={11} />
                          {copiedIndex === i ? "Copié !" : "Copier"}
                        </button>
                        <button
                          style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg)", cursor: "pointer", fontSize: 11, color: "var(--text-secondary)", transition: "all 0.1s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; }}
                        >
                          <ThumbsUp size={11} />
                        </button>
                        <button
                          style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg)", cursor: "pointer", fontSize: 11, color: "var(--text-secondary)", transition: "all 0.1s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg)"; }}
                        >
                          <RotateCcw size={11} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <User size={15} color="white" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Bot size={15} color="white" />
                </div>
                <div style={{ display: "flex", gap: 4, padding: "12px 16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px" }}>
                  {[0, 1, 2].map((dot) => (
                    <div key={dot} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", animation: `blink 1.2s ${dot * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── CHAT TEXT INPUT FOOTER ── */}
      <div className="card" style={{ padding: "10px 14px", flexShrink: 0, display: "flex", alignItems: "center", gap: 10, background: "var(--bg)", border: "1px solid var(--border)" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
          placeholder="Décrivez ce que vous souhaitez générer par IA..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 13,
            color: "var(--text-primary)",
            padding: "8px 4px",
          }}
        />

        {/* Info or helper text indicator */}
        {selectedClient !== "none" && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: "#2563EB", background: "#EFF6FF",
            padding: "4px 8px", borderRadius: 6, flexShrink: 0
          }}>
            Context : {mockClients.find(c => c.id === selectedClient)?.name}
          </span>
        )}

        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            width: 34, height: 34, borderRadius: 8,
            background: input.trim() ? "var(--primary)" : "var(--bg-muted)",
            border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: input.trim() ? "pointer" : "not-allowed", transition: "all 0.15s", flexShrink: 0
          }}
        >
          <Send size={14} color={input.trim() ? "white" : "var(--text-secondary)"} />
        </button>
      </div>

    </div>
  );
}
