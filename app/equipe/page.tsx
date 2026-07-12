"use client";
import { useState, useEffect } from "react";
import {
  Users, Bot, Plus, Settings2, Zap, Cpu,
  CheckCircle, Clock, Play, MoreHorizontal, Star, Loader2, AlertTriangle, AlertCircle,
  MessageSquare, Paperclip,
} from "lucide-react";
import { mockTeamMembers, mockAIAgents } from "@/lib/mock-data";
import type { AIAgent, AIAgentStatus, AgentTask } from "@/lib/mock-data";
import { AgentStudio } from "@/components/equipe/AgentStudio";
import { TaskAssignModal } from "@/components/equipe/TaskAssignModal";
import { BrainstormRoom } from "@/components/equipe/BrainstormRoom";
import { useSearchParams } from "next/navigation";

// ── Status helpers ────────────────────────────────────────────────────────────

const humanStatusConfig = {
  online:  { label: "En ligne",  color: "#10B981" },
  away:    { label: "Absent",    color: "#F59E0B" },
  offline: { label: "Hors ligne", color: "#94A3B8" },
};

const aiStatusConfig: Record<AIAgentStatus, { label: string; color: string }> = {
  active:  { label: "Actif",    color: "#10B981" },
  standby: { label: "En veille", color: "#94A3B8" },
  working: { label: "En tâche",  color: "#2563EB" },
};

const providerColors: Record<string, string> = {
  openai:    "#000000",
  gemini:    "#4285F4",
  anthropic: "#D4A27F",
  mistral:   "#FF7000",
};

const providerLabels: Record<string, string> = {
  openai:    "OpenAI",
  gemini:    "Gemini",
  anthropic: "Claude",
  mistral:   "Mistral",
};

const keyStatusConfigs = {
  valid: { label: "Clé valide", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
  untested: { label: "Clé non testée ⚠️", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  expired: { label: "Clé expirée ⛔", color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" },
  no_credits: { label: "Crédits épuisés ⛔", color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" },
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function EquipePage() {
  const [tab, setTab] = useState<"all" | "humans" | "agents">("all");

  // Agents state (mutable via Studio)
  const [agents, setAgents] = useState<AIAgent[]>(mockAIAgents);

  // Tasks per agent: agentId → AgentTask[]
  const [agentTasks, setAgentTasks] = useState<Record<string, AgentTask[]>>({});

  // Studio modal
  const [studioAgent, setStudioAgent] = useState<AIAgent | null | "new">(null);

  // Task assignment modal
  const [taskAgent, setTaskAgent] = useState<AIAgent | null>(null);

  // Meeting view state
  const searchParams = useSearchParams();
  const meetingParam = searchParams ? searchParams.get("meeting") === "true" : false;
  const [meetingOpen, setMeetingOpen] = useState(false);

  useEffect(() => {
    if (meetingParam) {
      setMeetingOpen(true);
    } else {
      setMeetingOpen(false);
    }
  }, [meetingParam]);

  // Save updated agent
  function handleSaveAgent(updated: AIAgent) {
    setAgents(prev => {
      const idx = prev.findIndex(a => a.id === updated.id);
      
      const validatedAgent = {
        ...updated,
        keyStatus: "valid" as const,
        status: (updated.status === "standby" ? "active" : updated.status) as AIAgentStatus,
      };

      if (idx >= 0) {
        const next = [...prev];
        next[idx] = validatedAgent;
        return next;
      }
      return [...prev, validatedAgent];
    });
  }

  // Assign task → simulate background job
  function handleAssignTask(agentId: string, description: string, clientName: string) {
    const taskId = `task-${Date.now()}`;
    const newTask: AgentTask = {
      id: taskId,
      description,
      clientName,
      status: "working",
      createdAt: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };

    // Set agent to "working"
    setAgents(prev => prev.map(a =>
      a.id === agentId ? { ...a, status: "working" as AIAgentStatus } : a
    ));

    // Add task to list
    setAgentTasks(prev => ({
      ...prev,
      [agentId]: [newTask, ...(prev[agentId] ?? [])],
    }));

    // After 5s: task done, agent back to "active"
    setTimeout(() => {
      setAgents(prev => prev.map(a =>
        a.id === agentId
          ? { ...a, status: "active" as AIAgentStatus, tasksCompleted: a.tasksCompleted + 1 }
          : a
      ));
      setAgentTasks(prev => ({
        ...prev,
        [agentId]: (prev[agentId] ?? []).map(t =>
          t.id === taskId
            ? { ...t, status: "done" as const, result: `Tâche terminée pour ${clientName}` }
            : t
        ),
      }));
    }, 5000);
  }

  const showHumans = tab === "all" || tab === "humans";
  const showAgents = tab === "all" || tab === "agents";

  const totalAI = agents.length;
  const activeAI = agents.filter(a => a.status === "active").length;
  const workingAI = agents.filter(a => a.status === "working").length;
  const totalTasks = agents.reduce((s, a) => s + a.tasksCompleted, 0);

  if (meetingOpen) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <BrainstormRoom
          agents={agents}
          onClose={() => setMeetingOpen(false)}
          onPlanTasks={(taskCount) => {
            setAgents(prev => prev.map((a, i) => i === 0 ? { ...a, tasksCompleted: a.tasksCompleted + taskCount } : a));
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Équipe & Agents IA</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Gérez vos collaborateurs humains et votre flotte de sous-agents IA spécialisés
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setStudioAgent("new")}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 9,
              background: "var(--primary)", border: "none",
              color: "white", fontSize: 13, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 1px 2px rgba(37,99,235,0.3)",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--primary-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Plus size={15} />
            Créer un Agent IA
          </button>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Humains", value: mockTeamMembers.length, icon: <Users size={16} />, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" },
          { label: "Agents IA", value: totalAI, icon: <Bot size={16} />, color: "#7C3AED", bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" },
          { label: "Agents actifs", value: activeAI + workingAI, icon: <Zap size={16} />, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" },
          { label: "Tâches IA réalisées", value: totalTasks, icon: <CheckCircle size={16} />, color: "#F59E0B", bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)" },
        ].map((kpi, i) => (
          <div key={i} className="card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center", color: kpi.color, flexShrink: 0 }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: 2, marginBottom: 24, background: "var(--bg-subtle)", padding: 4, borderRadius: 10, width: "fit-content", border: "1px solid var(--border)" }}>
        {[
          { id: "all", label: "Tous", count: mockTeamMembers.length + agents.length },
          { id: "humans", label: "Humains", count: mockTeamMembers.length },
          { id: "agents", label: "Agents IA", count: agents.length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            style={{
              padding: "7px 16px", borderRadius: 7, cursor: "pointer",
              border: "none",
              background: tab === t.id ? "var(--bg)" : "transparent",
              color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)",
              fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              display: "flex", alignItems: "center", gap: 6,
              boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            {t.label}
            <span style={{
              fontSize: 11, padding: "1px 7px", borderRadius: 20,
              background: tab === t.id ? "var(--bg-subtle)" : "transparent",
              color: tab === t.id ? "var(--primary)" : "var(--text-muted)",
              fontWeight: 600,
            }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Human Members ── */}
      {showHumans && (
        <div style={{ marginBottom: 32 }}>
          {tab === "all" && (
            <h2 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={13} /> Collaborateurs Humains
            </h2>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {mockTeamMembers.map(member => {
              const sc = humanStatusConfig[member.status as keyof typeof humanStatusConfig];
              return (
                <div key={member.id} className="card" style={{ padding: "18px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
                  {/* Avatar + status dot */}
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: "white",
                    }}>
                      {member.avatar}
                    </div>
                    <div style={{
                      position: "absolute", bottom: -2, right: -2,
                      width: 13, height: 13, borderRadius: "50%",
                      background: sc.color, border: "2px solid var(--bg)",
                    }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{member.role}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{
                      fontSize: 11, padding: "3px 9px", borderRadius: 20,
                      background: `${sc.color}18`, color: sc.color, fontWeight: 600,
                    }}>
                      {sc.label}
                    </span>
                    {member.clients > 0 && (
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {member.clients} client{member.clients > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{member.email}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── AI Agents ── */}
      {showAgents && (
        <div>
          {tab === "all" && (
            <h2 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <Bot size={13} /> Sous-Agents IA
            </h2>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {agents.map(agent => {
              const isKeyInvalid = agent.keyStatus !== "valid";
              
              // Force standby if key or credits are invalid/untested
              const statusToShow = isKeyInvalid ? "standby" : agent.status;
              const sc = aiStatusConfig[statusToShow];
              
              const tasks = agentTasks[agent.id] ?? [];
              const activeTasks = tasks.filter(t => t.status === "working");
              const doneTasks = tasks.filter(t => t.status === "done");
              
              const keyStatusInfo = keyStatusConfigs[agent.keyStatus] || { label: "Statut inconnu", color: "#EF4444", bg: "#FEF2F2", border: "#FCA5A5" };

              return (
                <div
                  key={agent.id}
                  className="card"
                  style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", opacity: isKeyInvalid ? 0.85 : 1 }}
                >
                  {/* Card header gradient bar */}
                  <div style={{ height: 4, background: isKeyInvalid ? "#94A3B8" : agent.avatarGradient }} />

                  <div style={{ padding: "16px 18px", flex: 1 }}>
                    {/* Top row: avatar + status */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {/* Avatar with pulse for "working" */}
                        <div style={{ position: "relative" }}>
                          <div style={{
                            width: 48, height: 48, borderRadius: 13,
                            background: isKeyInvalid ? "linear-gradient(135deg, #94A3B8, #64748B)" : agent.avatarGradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 15, fontWeight: 700, color: "white",
                          }}>
                            {agent.avatar}
                          </div>
                          {statusToShow === "working" && (
                            <div style={{
                              position: "absolute", bottom: -3, right: -3,
                              width: 16, height: 16, borderRadius: "50%",
                              background: "#2563EB", border: "2px solid var(--bg)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Loader2 size={8} color="white" style={{ animation: "spin 0.8s linear infinite" }} />
                            </div>
                          )}
                          {statusToShow !== "working" && (
                            <div style={{
                              position: "absolute", bottom: -2, right: -2,
                              width: 12, height: 12, borderRadius: "50%",
                              background: sc.color, border: "2px solid var(--bg)",
                            }} />
                          )}
                        </div>

                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{agent.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{agent.role}</div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
                        background: `${sc.color}18`, color: sc.color,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        {statusToShow === "working" && <Loader2 size={9} style={{ animation: "spin 0.8s linear infinite" }} />}
                        {sc.label}
                      </span>
                    </div>

                    {/* Specialty */}
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.5 }}>
                      {agent.specialty}
                    </div>

                    {/* Model + provider badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6,
                        background: `${providerColors[agent.provider]}18`,
                        color: providerColors[agent.provider],
                        border: `1px solid ${providerColors[agent.provider]}30`,
                      }}>
                        {providerLabels[agent.provider]}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
                        {agent.model}
                      </span>
                      {agent.hasCustomKey && (
                        <span style={{
                          fontSize: 10, padding: "2px 7px", borderRadius: 4,
                          background: isKeyInvalid ? "var(--bg-muted)" : "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
                          color: isKeyInvalid ? "var(--text-muted)" : "#10B981", fontWeight: 700,
                          border: isKeyInvalid ? "1px solid var(--border)" : "none"
                        }}>
                          BYOK
                        </span>
                      )}
                    </div>

                    {/* Key status error banner if invalid */}
                    {isKeyInvalid && (
                      <div style={{
                        marginBottom: 14, padding: "8px 12px", borderRadius: 8,
                        background: keyStatusInfo.bg, border: `1px solid ${keyStatusInfo.border}`,
                        color: keyStatusInfo.color, fontSize: 11.5, fontWeight: 600,
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <AlertTriangle size={13} style={{ flexShrink: 0 }} />
                        <span>{keyStatusInfo.label} — Configurer l'agent</span>
                      </div>
                    )}

                    {/* Stats row */}
                    <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}>
                        <CheckCircle size={12} color="#10B981" />
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{agent.tasksCompleted}</span>
                        tâches réalisées
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}>
                        <Star size={12} color="#F59E0B" />
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{Math.round(agent.temperature * 100)}%</span>
                        créativité
                      </div>
                    </div>

                    {/* Knowledge docs */}
                    {agent.knowledgeDocs.length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                        {agent.knowledgeDocs.map((d, i) => (
                          <span key={i} style={{
                            fontSize: 10, padding: "2px 8px", borderRadius: 4,
                            background: "var(--bg-subtle)", color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                            display: "inline-flex", alignItems: "center", gap: 4
                          }}>
                            <Paperclip size={10} />
                            <span>{d.length > 20 ? d.slice(0, 18) + "…" : d}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Active tasks */}
                    {activeTasks.map(t => (
                      <div key={t.id} style={{
                        padding: "8px 10px", borderRadius: 8, marginBottom: 8,
                        background: "linear-gradient(135deg, #EFF6FF, #EDE9FE)",
                        border: "1px solid #BFDBFE",
                        fontSize: 12, color: "#2563EB",
                        display: "flex", alignItems: "center", gap: 7,
                      }}>
                        <Loader2 size={12} style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {t.description}
                          </div>
                          <div style={{ fontSize: 10, color: "#3B82F6" }}>{t.clientName} · Démarré à {t.createdAt}</div>
                        </div>
                      </div>
                    ))}

                    {/* Completed tasks (last 1) */}
                    {doneTasks.slice(0, 1).map(t => (
                      <div key={t.id} style={{
                        padding: "8px 10px", borderRadius: 8, marginBottom: 8,
                        background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
                        border: "1px solid #A7F3D0",
                        fontSize: 12, color: "#059669",
                        display: "flex", alignItems: "center", gap: 7,
                      }}>
                        <CheckCircle size={12} style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{t.description}</div>
                          <div style={{ fontSize: 10, color: "#10B981" }}>Terminé pour {t.clientName}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action footer */}
                  <div style={{
                    padding: "12px 18px",
                    borderTop: "1px solid var(--border)",
                    display: "flex", gap: 8,
                    background: "var(--bg-subtle)",
                  }}>
                    <button
                      onClick={() => setTaskAgent(agent)}
                      disabled={agent.status === "working" || isKeyInvalid}
                      style={{
                        flex: 1, padding: "8px", borderRadius: 7,
                        border: "none",
                        background: (agent.status === "working" || isKeyInvalid) ? "var(--bg-muted)" : "var(--primary)",
                        color: (agent.status === "working" || isKeyInvalid) ? "var(--text-muted)" : "white",
                        fontSize: 12, fontWeight: 600, cursor: (agent.status === "working" || isKeyInvalid) ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                        fontFamily: "var(--font-sans)", transition: "all 0.15s",
                      }}
                    >
                      <Play size={12} />
                      {isKeyInvalid ? "En veille (Clé requise)" : "Assigner une tâche"}
                    </button>
                    <button
                      onClick={() => setStudioAgent(agent)}
                      style={{
                        padding: "8px 12px", borderRadius: 7,
                        border: "1px solid var(--border)",
                        background: "transparent", color: "var(--text-secondary)",
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
                        fontSize: 12, fontFamily: "var(--font-sans)", transition: "all 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                    >
                      <Settings2 size={13} />
                      Configurer
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add agent card */}
            <button
              onClick={() => setStudioAgent("new")}
              style={{
                padding: 20, borderRadius: 12,
                border: "2px dashed var(--border)",
                background: "transparent",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 10, color: "var(--text-muted)",
                minHeight: 200,
                fontFamily: "var(--font-sans)",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #EFF6FF10, #EDE9FE10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, border: "2px dashed currentColor", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={20} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Créer un Agent IA</div>
                <div style={{ fontSize: 11, marginTop: 3 }}>Personnalisez le cerveau et le moteur</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {studioAgent !== null && (
        <AgentStudio
          agent={studioAgent === "new" ? null : studioAgent}
          onClose={() => setStudioAgent(null)}
          onSave={handleSaveAgent}
        />
      )}
      {taskAgent !== null && (
        <TaskAssignModal
          agent={taskAgent}
          onClose={() => setTaskAgent(null)}
          onAssign={handleAssignTask}
        />
      )}
    </div>
  );
}
