"use client";
import { useState } from "react";
import {
  X, Brain, Cpu, Upload, Link, Trash2, Eye, EyeOff,
  CheckCircle, XCircle, Loader2, AlertCircle, FileText,
} from "lucide-react";
import type { AIAgent, AIProvider } from "@/lib/mock-data";

// ── Provider logos (SVG inline) ──────────────────────────────────────────────

const ProviderLogo = ({ provider, size = 18 }: { provider: AIProvider; size?: number }) => {
  if (provider === "openai") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.569 19.8a4.5 4.5 0 0 1-5.969-1.496zM2.19 8.645a4.5 4.5 0 0 1 2.355-1.98v5.58a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.24 15.26A4.5 4.5 0 0 1 2.19 8.645zm16.57 3.865l-5.843-3.369 2.02-1.164a.075.075 0 0 1 .071 0l4.416 2.549a4.5 4.5 0 0 1-.676 8.105v-5.572a.79.79 0 0 0-.388-.65zm2.008-3.223l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.226 9.886V7.554a.072.072 0 0 1 .032-.065l4.413-2.548a4.5 4.5 0 0 1 6.097 4.66zM8.556 14.84l-2.02-1.164a.08.08 0 0 1-.038-.057V8.018a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.952 7.396a.795.795 0 0 0-.396.681zm1.094-2.37 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
  if (provider === "anthropic") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm4.132 9.959L8.453 7.687 6.205 13.48h4.496z"/>
    </svg>
  );
  if (provider === "gemini") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
    </svg>
  );
  if (provider === "mistral") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 2h4v4H0zM20 2h4v4h-4zM4 2h4v4H4zM8 2h4v4H8zM16 2h4v4h-4zM8 6h4v4H8zM16 6h4v4h-4zM0 6h4v4H0zM20 6h4v4h-4zM0 10h4v4H0zM20 10h4v4h-4zM4 14h4v4H4zM8 14h4v4H8zM16 14h4v4h-4zM0 14h4v4H0zM20 14h4v4h-4zM8 18h4v4H8zM16 18h4v4h-4zM4 18h4v4H4zM0 18h4v4H0zM20 18h4v4h-4z"/>
    </svg>
  );
  return null;
};

// ── LLM Model options per provider ──────────────────────────────────────────

const LLM_OPTIONS: { provider: AIProvider; label: string; color: string; models: string[] }[] = [
  {
    provider: "openai",
    label: "OpenAI",
    color: "#000000",
    models: ["GPT-4o", "GPT-4o mini", "GPT-4 Turbo"],
  },
  {
    provider: "gemini",
    label: "Google Gemini",
    color: "#4285F4",
    models: ["Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini 2.0 Flash"],
  },
  {
    provider: "anthropic",
    label: "Anthropic Claude",
    color: "#D4A27F",
    models: ["Claude 3.5 Sonnet", "Claude 3.5 Haiku", "Claude 3 Opus"],
  },
  {
    provider: "mistral",
    label: "Mistral AI",
    color: "#FF7000",
    models: ["Mistral Large", "Mistral Nemo", "Codestral"],
  },
];

// ── Props ────────────────────────────────────────────────────────────────────

interface AgentStudioProps {
  agent: AIAgent | null;
  onClose: () => void;
  onSave: (updated: AIAgent) => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export function AgentStudio({ agent, onClose, onSave }: AgentStudioProps) {
  const isNew = !agent;

  const [tab, setTab] = useState<"brain" | "engine">("brain");

  // Brain state
  const [name, setName] = useState(agent?.name ?? "");
  const [role, setRole] = useState(agent?.role ?? "");
  const [systemPrompt, setSystemPrompt] = useState(agent?.systemPrompt ?? "");
  const [temperature, setTemperature] = useState(agent?.temperature ?? 0.5);
  const [docs, setDocs] = useState<string[]>(agent?.knowledgeDocs ?? []);
  const [urlInput, setUrlInput] = useState("");

  // Engine state
  const [provider, setProvider] = useState<AIProvider>(agent?.provider ?? "openai");
  const [model, setModel] = useState(agent?.model ?? "GPT-4o");
  const [apiKey, setApiKey] = useState(agent?.hasCustomKey ? "sk-••••••••••••••••••••••••" : "");
  const [showKey, setShowKey] = useState(false);
  const [useFallback, setUseFallback] = useState(!agent?.hasCustomKey);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "ok" | "fail">("idle");
  const [testError, setTestError] = useState("");

  const providerConfig = LLM_OPTIONS.find(o => o.provider === provider)!;

  function handleProviderChange(p: AIProvider) {
    setProvider(p);
    const cfg = LLM_OPTIONS.find(o => o.provider === p)!;
    setModel(cfg.models[0]);
    setTestStatus("idle");
    setTestError("");
  }

  function handleAddUrl() {
    if (urlInput.trim() && !docs.includes(urlInput.trim())) {
      setDocs(prev => [...prev, urlInput.trim()]);
      setUrlInput("");
    }
  }

  function simulateUpload() {
    const fakeNames = ["Guide marque.pdf", "Calendrier éditorial.xlsx", "Charte graphique.pdf"];
    const pick = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    setDocs(prev => [...prev, pick]);
  }

  async function testConnection() {
    setTestStatus("testing");
    setTestError("");
    try {
      const res = await fetch("/api/test-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider, apiKey }),
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        setTestStatus("ok");
      } else {
        setTestStatus("fail");
        setTestError(data.error || "Erreur de connexion");
      }
    } catch (err: any) {
      setTestStatus("fail");
      setTestError(err.message || "Erreur réseau");
    }
  }

  function handleSave() {
    const updated: AIAgent = {
      id: agent?.id ?? `ai${Date.now()}`,
      name: name || "Nouvel Agent",
      role: role || "Agent IA",
      specialty: agent?.specialty ?? role,
      avatar: name.slice(0, 2).toUpperCase() || "IA",
      avatarGradient: agent?.avatarGradient ?? "linear-gradient(135deg, #2563EB, #7C3AED)",
      status: agent?.status ?? "standby",
      provider,
      model,
      systemPrompt,
      temperature,
      hasCustomKey: !useFallback && apiKey.length > 10,
      keyStatus: agent?.keyStatus ?? "untested",
      tasksCompleted: agent?.tasksCompleted ?? 0,
      knowledgeDocs: docs,
    };
    onSave(updated);
    onClose();
  }

  const tempLabel = temperature < 0.25
    ? "Factuel & Strict"
    : temperature < 0.55
    ? "Équilibré"
    : temperature < 0.8
    ? "Créatif"
    : "Très créatif";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 200 }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%", maxWidth: 660,
        maxHeight: "90vh",
        background: "var(--bg)",
        borderRadius: 16,
        border: "1px solid var(--border)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        zIndex: 201,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
              {isNew ? "Créer un Agent IA" : `Configurer — ${agent?.name}`}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              Studio de programmation
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 4, borderRadius: 6 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
          {[
            { id: "brain", icon: Brain, label: "Cerveau & Comportement" },
            { id: "engine", icon: Cpu, label: "Moteur & Clé API" },
          ].map(t => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "12px 16px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? "var(--primary)" : "var(--text-muted)",
                  borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                  marginBottom: -1,
                  transition: "all 0.15s",
                }}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

          {/* ── TAB A : BRAIN ── */}
          {tab === "brain" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Name + Role */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Nom de l'agent</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="ex: Alex"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", color: "var(--text-primary)",
                      fontSize: 13, outline: "none", fontFamily: "var(--font-sans)",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.currentTarget).style.borderColor = "var(--primary)"}
                    onBlur={e => (e.currentTarget).style.borderColor = "var(--border)"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Rôle / Spécialité</label>
                  <input
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="ex: Copywriter LinkedIn"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", color: "var(--text-primary)",
                      fontSize: 13, outline: "none", fontFamily: "var(--font-sans)",
                      boxSizing: "border-box",
                    }}
                    onFocus={e => (e.currentTarget).style.borderColor = "var(--primary)"}
                    onBlur={e => (e.currentTarget).style.borderColor = "var(--border)"}
                  />
                </div>
              </div>

              {/* System Prompt */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Instructions Système (System Prompt)
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                  rows={6}
                  placeholder="Décris le persona de l'agent, son ton, ses règles strictes et ses limites. Ex : « Tu es un expert SEO chic et minimaliste. Tu utilises toujours des données chiffrées et tu n'utilises jamais de jargon creux. »"
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

              {/* Temperature slider */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                    Curseur de Créativité
                  </label>
                  <span style={{
                    fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 20,
                    background: "linear-gradient(135deg, #EFF6FF, #EDE9FE)",
                    color: "var(--primary)"
                  }}>
                    {tempLabel} · {Math.round(temperature * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0} max={1} step={0.01}
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                  <span>Factuel / Strict</span>
                  <span>Très créatif</span>
                </div>
              </div>

              {/* Knowledge Base */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Base de Connaissances (RAG)
                </label>

                {/* Document list */}
                {docs.length > 0 && (
                  <div style={{ marginBottom: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {docs.map((d, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 12px", borderRadius: 8,
                        background: "var(--bg-subtle)", border: "1px solid var(--border)",
                        fontSize: 12,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)" }}>
                          <FileText size={13} />
                          {d}
                        </div>
                        <button onClick={() => setDocs(prev => prev.filter((_, j) => j !== i))}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={simulateUpload}
                    style={{
                      flex: 1, padding: "9px", borderRadius: 8, cursor: "pointer",
                      border: "1.5px dashed var(--border-strong)",
                      background: "var(--bg-subtle)", color: "var(--text-secondary)",
                      fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontFamily: "var(--font-sans)", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    <Upload size={13} />
                    Uploader un fichier (PDF, TXT)
                  </button>
                  <div style={{ flex: 1, display: "flex", gap: 6 }}>
                    <input
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAddUrl()}
                      placeholder="Ancrer une URL..."
                      style={{
                        flex: 1, padding: "9px 10px",
                        borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)",
                        fontSize: 12, outline: "none", fontFamily: "var(--font-sans)",
                      }}
                    />
                    <button
                      onClick={handleAddUrl}
                      style={{
                        padding: "9px 12px", borderRadius: 8, cursor: "pointer",
                        background: "var(--bg-subtle)", border: "1px solid var(--border)",
                        color: "var(--text-secondary)", display: "flex", alignItems: "center",
                      }}
                    >
                      <Link size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB B : ENGINE ── */}
          {tab === "engine" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* LLM Provider selector */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 10 }}>
                  Moteur IA (LLM)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {LLM_OPTIONS.map(opt => {
                    const active = provider === opt.provider;
                    return (
                      <button
                        key={opt.provider}
                        onClick={() => handleProviderChange(opt.provider)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: active ? `2px solid var(--primary)` : "1.5px solid var(--border)",
                          background: active ? "linear-gradient(135deg, #EFF6FF, #EDE9FE)" : "var(--bg-subtle)",
                          cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 10,
                          transition: "all 0.15s",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ color: active ? opt.color : "var(--text-muted)", flexShrink: 0 }}>
                          <ProviderLogo provider={opt.provider} size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: active ? "var(--primary)" : "var(--text-primary)" }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{opt.models[0]}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model selector */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                  Modèle précis — {providerConfig.label}
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {providerConfig.models.map(m => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      style={{
                        padding: "7px 14px", borderRadius: 20,
                        border: model === m ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                        background: model === m ? "var(--primary)" : "var(--bg-subtle)",
                        color: model === m ? "white" : "var(--text-secondary)",
                        fontSize: 12, fontWeight: 600, cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* BYOK vs Fallback toggle */}
              <div style={{
                padding: 14, borderRadius: 10,
                background: useFallback ? "linear-gradient(135deg, #ECFDF5, #D1FAE5)" : "var(--bg-subtle)",
                border: `1.5px solid ${useFallback ? "#10B981" : "var(--border)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Mode Fallback (Crédits CM-IA PRO)</div>
                  <button
                    onClick={() => setUseFallback(p => !p)}
                    style={{
                      width: 40, height: 22, borderRadius: 11,
                      background: useFallback ? "#10B981" : "var(--border-strong)",
                      border: "none", cursor: "pointer", position: "relative",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 3,
                      left: useFallback ? 21 : 3,
                      width: 16, height: 16,
                      borderRadius: "50%", background: "white",
                      transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }} />
                  </button>
                </div>
                <div style={{ fontSize: 12, color: useFallback ? "#059669" : "var(--text-muted)" }}>
                  {useFallback
                    ? "L'agent utilise les crédits inclus dans votre abonnement Pro. Aucune clé requise."
                    : "Mode BYOK actif — l'agent utilisera votre propre clé API."}
                </div>
              </div>

              {/* BYOK API Key field */}
              {!useFallback && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                    Clé API personnelle (BYOK)
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={e => { setApiKey(e.target.value); setTestStatus("idle"); }}
                        placeholder="sk-••••••••••••••••••••••••••••••••"
                        style={{
                          width: "100%", padding: "9px 36px 9px 12px",
                          borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)",
                          fontSize: 13, outline: "none", fontFamily: "monospace",
                          boxSizing: "border-box",
                        }}
                        onFocus={e => (e.currentTarget).style.borderColor = "var(--primary)"}
                        onBlur={e => (e.currentTarget).style.borderColor = "var(--border)"}
                      />
                      <button
                        onClick={() => setShowKey(p => !p)}
                        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                      >
                        {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <button
                      onClick={testConnection}
                      disabled={testStatus === "testing"}
                      style={{
                        padding: "9px 16px", borderRadius: 8, cursor: "pointer",
                        border: "1.5px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-secondary)",
                        fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                        display: "flex", alignItems: "center", gap: 6,
                        fontFamily: "var(--font-sans)",
                        transition: "all 0.15s",
                      }}
                    >
                      {testStatus === "testing" && <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} />}
                      {testStatus === "ok" && <CheckCircle size={13} color="#10B981" />}
                      {testStatus === "fail" && <XCircle size={13} color="#EF4444" />}
                      {testStatus === "idle" && <AlertCircle size={13} />}
                      Tester
                    </button>
                  </div>

                  {testStatus === "ok" && (
                    <div style={{ marginTop: 6, fontSize: 12, color: "#10B981", display: "flex", alignItems: "center", gap: 5 }}>
                      <CheckCircle size={12} /> Connexion API réussie — Clé valide et opérationnelle
                    </div>
                  )}
                  {testStatus === "fail" && (
                    <div style={{ marginTop: 6, fontSize: 12, color: "#EF4444", display: "flex", alignItems: "center", gap: 5 }}>
                      <XCircle size={12} /> {testError || "Clé invalide ou expirée — Vérifiez le format"}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "flex-end", gap: 10,
          background: "var(--bg-subtle)",
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 18px", borderRadius: 8, cursor: "pointer",
              border: "1px solid var(--border)", background: "transparent",
              color: "var(--text-secondary)", fontSize: 13,
              fontFamily: "var(--font-sans)",
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "9px 22px", borderRadius: 8, cursor: "pointer",
              border: "none", background: "var(--primary)",
              color: "white", fontSize: 13, fontWeight: 600,
              fontFamily: "var(--font-sans)",
              boxShadow: "0 1px 2px rgba(37,99,235,0.3)",
            }}
          >
            {isNew ? "Créer l'agent" : "Sauvegarder"}
          </button>
        </div>
      </div>
    </>
  );
}
