"use client";
import { useState } from "react";
import { X, Send, User } from "lucide-react";
import { mockClients } from "@/lib/mock-data";
import type { AIAgent } from "@/lib/mock-data";

interface TaskAssignModalProps {
  agent: AIAgent;
  onClose: () => void;
  onAssign: (agentId: string, description: string, clientName: string) => void;
}

export function TaskAssignModal({ agent, onClose, onAssign }: TaskAssignModalProps) {
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState(mockClients[0].id);

  const client = mockClients.find(c => c.id === clientId)!;

  const suggestions = [
    `Rédige 3 posts pour ${client.name} dans le style de ${agent.role}`,
    `Analyse les tendances du secteur ${client.sector} pour ${client.name}`,
    `Crée un calendrier éditorial de 2 semaines pour ${client.name}`,
    `Génère 5 accroches percutantes pour une campagne ${client.name}`,
  ];

  function handleSubmit() {
    if (!description.trim()) return;
    onAssign(agent.id, description, client.name);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 300 }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%", maxWidth: 480,
        background: "var(--bg)",
        borderRadius: 14,
        border: "1px solid var(--border)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        zIndex: 301,
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Agent mini avatar */}
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: agent.avatarGradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "white",
            }}>
              {agent.avatar}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                Assigner une tâche à {agent.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{agent.role} · {agent.model}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Client selector */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Client cible
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {mockClients.filter(c => c.status === "active").map(c => (
                <button
                  key={c.id}
                  onClick={() => setClientId(c.id)}
                  style={{
                    padding: "5px 12px", borderRadius: 20,
                    border: clientId === c.id ? `2px solid ${c.logoColor}` : "1.5px solid var(--border)",
                    background: clientId === c.id ? `${c.logoColor}18` : "var(--bg-subtle)",
                    color: clientId === c.id ? c.logoColor : "var(--text-secondary)",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    transition: "all 0.12s",
                  }}
                >
                  <span style={{
                    width: 16, height: 16, borderRadius: 4,
                    background: c.logoColor,
                    fontSize: 8, fontWeight: 700, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {c.logo}
                  </span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Task description */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Description de la tâche
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder={`Décrivez ce que ${agent.name} doit faire pour ${client.name}...`}
              style={{
                width: "100%", padding: "10px 12px",
                borderRadius: 8, border: "1px solid var(--border)",
                background: "var(--bg-subtle)", color: "var(--text-primary)",
                fontSize: 13, lineHeight: 1.6, outline: "none",
                fontFamily: "var(--font-sans)", resize: "vertical",
                boxSizing: "border-box",
              }}
              onFocus={e => (e.currentTarget).style.borderColor = "var(--primary)"}
              onBlur={e => (e.currentTarget).style.borderColor = "var(--border)"}
            />
          </div>

          {/* Suggestions rapides */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Suggestions rapides
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setDescription(s)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 7, border: "1px solid var(--border)",
                    background: "var(--bg-subtle)",
                    color: "var(--text-secondary)",
                    fontSize: 12, cursor: "pointer",
                    textAlign: "left", fontFamily: "var(--font-sans)",
                    transition: "all 0.12s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-muted)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            style={{
              padding: "11px", borderRadius: 8,
              border: "none",
              background: description.trim() ? "var(--primary)" : "var(--bg-muted)",
              color: description.trim() ? "white" : "var(--text-muted)",
              fontSize: 13, fontWeight: 600, cursor: description.trim() ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            <Send size={14} />
            Déléguer à {agent.name}
          </button>
        </div>
      </div>
    </>
  );
}
