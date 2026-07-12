"use client";
import { useState, useEffect, useRef } from "react";
import {
  Users, Bot, Play, Send, CheckCircle, ArrowLeft,
  Sparkles, Loader2, AlertCircle, Calendar, Plus, MessageSquare, ClipboardList, Info,
  FileText, Palette, Video, Laptop, X, Check, Save, Eye,
} from "lucide-react";
import { mockClients, mockTeamMembers, mockUser } from "@/lib/mock-data";
import type { AIAgent, MeetingMessage } from "@/lib/mock-data";

interface BrainstormRoomProps {
  agents: AIAgent[];
  onClose: () => void;
  onPlanTasks: (taskCount: number) => void;
}

export function BrainstormRoom({ agents, onClose, onPlanTasks }: BrainstormRoomProps) {
  const [step, setStep] = useState<"setup" | "running" | "completed">("setup");

  // Brief configuration
  const [title, setTitle] = useState("Lancement de campagne estivale");
  const [brief, setBrief] = useState(
    "Nous devons lancer une campagne pour annoncer le report de notre événement au 25 du mois, avec un ton sobre, professionnel et un message rassurant pour les participants."
  );
  const [clientId, setClientId] = useState(mockClients[0]?.id || "");

  // Participant selection (IDs)
  const [selectedHumans, setSelectedHumans] = useState<string[]>(["t2", "t3"]); // Lucas, Emma by default
  const [selectedAI, setSelectedAI] = useState<string[]>(["ai1", "ai3"]); // Alex, Sam by default

  // Chat message stream
  const [messages, setMessages] = useState<MeetingMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null); // ID of currently typing participant
  const [typingText, setTypingText] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeSpeaker]);

  const client = (mockClients.find(c => c.id === clientId) || mockClients[0]) as any;

  // Selected deliverable for preview modal
  const [selectedPreview, setSelectedPreview] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const deliverables = [
    {
      id: "del-1",
      title: "Plan de publication",
      source: "Alex (Copywriter)",
      icon: <FileText size={13} color="var(--primary)" />,
      type: "linkedin",
      content: {
        title: "LinkedIn Post — Annonce de Report",
        author: "Alex (Copywriter IA)",
        badge: "Prêt pour publication",
        text: `📢 Annonce importante : Ajustement de notre calendrier événementiel pour ${client.name}.

Afin de vous garantir une expérience optimale et d'accueillir nos intervenants dans les meilleures conditions logistiques, notre événement mensuel initialement prévu est décalé au mardi 25.

🔒 Votre confort et la qualité des échanges passent avant tout. Vos accès et billets restent bien entendu valides pour cette nouvelle date.

Si vous avez la moindre question logistique, notre équipe est à votre entière disposition en commentaire ou en message privé. À très vite !`,
        mediaUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&fit=crop"
      }
    },
    {
      id: "del-2",
      title: "Prompt d'illustration",
      source: "Iris (Designer)",
      icon: <Palette size={13} color="var(--primary)" />,
      type: "prompt",
      content: {
        title: "Prompt d'illustration IA",
        author: "Iris (Designer IA)",
        badge: "Prompt généré",
        promptText: `/prompt elegant minimalistic calendar with the number 25 highlighted in gold light, soft professional corporate styling, clean studio lighting, warm beige background, high resolution --ar 4:5`,
        instructions: "Copiez ce prompt dans Midjourney v6 ou Stable Diffusion XL pour générer le visuel de la campagne. La palette respecte le 'Soft Design' (teintes crème, or mat et ardoise).",
        mediaUrl: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=600&fit=crop"
      }
    },
    {
      id: "del-3",
      title: "Script Reel de 30s",
      source: "Maya (Instagram)",
      icon: <Video size={13} color="var(--primary)" />,
      type: "script",
      content: {
        title: "Script de vidéo courte (Reel/TikTok)",
        author: "Maya (Instagram Specialist)",
        badge: "Script de tournage",
        text: `🎬 [00:00 - 00:05] Intro visuelle :
Gros plan esthétique sur une tasse fumante à côté d'un calendrier papier. Une main vient entourer le chiffre 25 en doré.
Texte à l'écran : "Nouvelle date : Mardi 25"
Voix off : "Parfois, le timing parfait demande un léger contretemps..."

👥 [00:05 - 00:18] Prise de parole :
Le créateur de contenu (face caméra, cadre pro, lumière douce).
Voix off / Live : "Pour vous accueillir dans les meilleures conditions logistiques chez ${client.name}, notre rencontre est décalée au mardi 25 de ce mois."

⚙️ [00:18 - 00:25] B-roll :
Plan de l'équipe de préparation en réunion, sourires et concentration, focus sur des carnets et écrans.
Voix off : "Notre équipe peaufine des intervenants d'exception et quelques surprises exclusives..."

🚀 [00:25 - 00:30] Outro :
Écran final avec logo et bouton "Lien en bio".
Voix off : "Vos accès restent valides. On se retrouve le 25 !"`,
      }
    },
    {
      id: "del-4",
      title: "Maquette Affiche Figma",
      source: "Thomas (Designer)",
      icon: <Laptop size={13} color="var(--primary)" />,
      type: "figma",
      content: {
        title: "Gabarit Figma / Charte de Campagne",
        author: "Thomas (Designer)",
        badge: "Maquette validée",
        text: `📐 Spécifications de la maquette :
- Format : 1200 x 1500 px (Portait optimal)
- Palette : Slate-50 (#F8FAFC), Beige (#FDFBF7), Or (#D97706)
- Fonts : Playfair Display (Titres), Inter (Infos)
- Structure : Logo en-tête / Calendrier stylisé centré / CTA bas.`,
        mediaUrl: "https://images.unsplash.com/photo-1542744173-8e08562744ad?w=600&fit=crop"
      }
    }
  ];

  // Toggle selection
  const toggleHuman = (id: string) => {
    setSelectedHumans(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleAI = (id: string) => {
    setSelectedAI(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Start the meeting and trigger sequential tour de table
  function startMeeting() {
    if (!title.trim() || !brief.trim()) return;
    setStep("running");
    setMessages([
      {
        id: "msg-brief",
        senderId: "user",
        senderName: mockUser.name,
        senderAvatar: mockUser.avatar,
        role: "Manager",
        content: `**Brief de lancement : ${title}**\n\n${brief}\n\nClient ciblé : **${client.name}** (${client.sector}).\n\nLançons le tour de table pour cadrer ce projet. Qui commence ?`,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        type: "user"
      }
    ]);

    // Gather all selected participants in order
    const list: { id: string; name: string; avatar: string; gradient?: string; role: string; type: "human" | "ai" }[] = [];
    
    // Add selected AI agents
    agents.filter(a => selectedAI.includes(a.id)).forEach(a => {
      list.push({ id: a.id, name: a.name, avatar: a.avatar, gradient: a.avatarGradient, role: a.role, type: "ai" });
    });
    
    // Add selected Humans
    mockTeamMembers.filter(h => selectedHumans.includes(h.id)).forEach(h => {
      list.push({ id: h.id, name: h.name, avatar: h.avatar, role: h.role, type: "human" });
    });

    if (list.length === 0) return;

    // Sequential speak trigger
    runTourDeTable(list, 0);
  }

  // Simulates sequential typing and posting of comments
  function runTourDeTable(
    participants: { id: string; name: string; avatar: string; gradient?: string; role: string; type: "human" | "ai" }[],
    index: number
  ) {
    if (index >= participants.length) {
      // Finished tour de table
      setActiveSpeaker(null);
      return;
    }

    const speaker = participants[index];
    setActiveSpeaker(speaker.id);
    setTypingText(`${speaker.name} réfléchit sous l'angle de sa spécialité...`);

    // Dynamic response text based on the brief and participant specialty
    let responseText = "";
    if (speaker.id === "ai1") {
      responseText = `**Proposition de posts LinkedIn Pro :**\n\n*Option 1 (Directe & Rassurante) :*\n« Transparence & Adaptation. Notre événement initialement prévu est décalé au 25 de ce mois. Sécurité et confort passent avant tout. Vos billets restent valides. Des questions ? On vous répond en commentaire. »\n\n*Option 2 (Valorisation du report) :*\n« Plus de temps pour peaufiner l'expérience. Notre table ronde est décalée au 25. Un délai supplémentaire pour vous garantir des intervenants de premier plan. Rendez-vous le 25 ! »`;
    } else if (speaker.id === "ai2") {
      responseText = `**Concept créatif Instagram :**\nJe propose une série de Stories avec un décompte épuré reprenant la nouvelle date (J-14). \nPour le feed, un post carrousel graphique de 3 slides. \nTon : Apaisant et esthétique, avec des teintes pastel chaudes pour rassurer les abonnés.`;
    } else if (speaker.id === "ai3") {
      responseText = `**Analyse des opportunités & Planification :**\nPour ${client.name}, le report d'événement doit être annoncé en priorité le mardi matin à 9h00 (pic d'attention pro) sur LinkedIn, doublé d'une Story Instagram récapitulative le soir à 18h. \nKPIs à suivre : Taux de complétion des stories explicatives et demandes de remboursement (pour anticiper les désistements).`;
    } else if (speaker.id === "ai4") {
      responseText = `**Rédaction de l'Email / Newsletter informative :**\nSujet : « [Important] Nouvelle date pour notre événement du mois »\nContenu : Un email structuré expliquant les raisons logistiques du report, les modalités de report automatique des billets, et un bouton d'action vers le support client.`;
    } else if (speaker.id === "ai5") {
      responseText = `**Prompt visuel génératif (Midjourney) pour l'affiche :**\n\`/prompt elegant minimalistic calendar with the number 25 highlighted in gold light, soft professional corporate styling, clean studio lighting, warm beige background, high resolution --ar 4:5\``;
    } else if (speaker.id === "t2") {
      responseText = `Je valide les propositions de l'IA d'emailing. De mon côté, je peux m'occuper de planifier le tournage d'une courte vidéo avec l'organisateur pour expliquer le décalage de vive voix. C'est toujours plus rassurant d'avoir un visage humain.`;
    } else if (speaker.id === "t3") {
      responseText = `Sur les réseaux, je conseille d'activer le filtre de modération sur les termes "remboursement" ou "annulation" pour traiter les cas sensibles en MP en priorité et éviter les vagues d'inquiétudes dans les commentaires publics.`;
    } else if (speaker.id === "t4") {
      responseText = `Je m'occupe de décliner la charte de l'affiche dès demain matin sur Figma pour qu'on ait le visuel prêt pour la newsletter et les posts. Je partirai sur la palette sobre suggérée par Iris.`;
    } else {
      responseText = `Je suis d'accord avec la direction générale. Je vais monitorer de près les premières heures après l'annonce pour vous faire un retour d'impact.`;
    }

    setTimeout(() => {
      // Add message
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-${speaker.id}`,
          senderId: speaker.id,
          senderName: speaker.name,
          senderAvatar: speaker.avatar,
          avatarGradient: speaker.gradient,
          role: speaker.role,
          content: responseText,
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          type: speaker.type
        }
      ]);
      
      // Call next speaker after 2.5 seconds
      runTourDeTable(participants, index + 1);
    }, 3000);
  }

  // Handle user typing and sending custom prompt during running meeting
  function handleSendMessage() {
    if (!userInput.trim() || activeSpeaker !== null) return;
    
    const userMsg: MeetingMessage = {
      id: `msg-user-${Date.now()}`,
      senderId: "user",
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      role: "Manager",
      content: userInput,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      type: "user"
    };

    setMessages(prev => [...prev, userMsg]);
    const prompt = userInput;
    setUserInput("");

    // Simulate response from mentioned agent or first available agent
    let targetedId = "";
    let targetName = "";
    let targetGradient = "";
    let targetRole = "";
    let targetType: "human" | "ai" = "ai";

    // Detect `@name` mentions
    const mentionMatch = prompt.match(/@(\w+)/);
    if (mentionMatch) {
      const name = mentionMatch[1].toLowerCase();
      const aiTarget = agents.find(a => a.name.toLowerCase() === name);
      const humanTarget = mockTeamMembers.find(t => t.name.toLowerCase().startsWith(name));
      if (aiTarget) {
        targetedId = aiTarget.id;
        targetName = aiTarget.name;
        targetGradient = aiTarget.avatarGradient;
        targetRole = aiTarget.role;
        targetType = "ai";
      } else if (humanTarget) {
        targetedId = humanTarget.id;
        targetName = humanTarget.name;
        targetRole = humanTarget.role;
        targetType = "human";
      }
    }

    // Default target if none mentioned
    if (!targetedId) {
      const firstAI = agents.find(a => selectedAI.includes(a.id));
      if (firstAI) {
        targetedId = firstAI.id;
        targetName = firstAI.name;
        targetGradient = firstAI.avatarGradient;
        targetRole = firstAI.role;
        targetType = "ai";
      } else {
        targetedId = "t2";
        targetName = "Créateur de contenu";
        targetRole = "Content Creator";
        targetType = "human";
      }
    }

    setActiveSpeaker(targetedId);
    setTypingText(`${targetName} prépare sa réponse suite à votre consigne...`);

    setTimeout(() => {
      let customReply = `Bien reçu ! J'adapte ma proposition selon ta remarque : \n\n« Campagne révisée : focus sur la sobriété et l'aspect rassurant. Visuel épuré en cours de déclinaison avec les polices de la marque. »`;
      if (targetedId === "t4") {
        customReply = `Compris. Je vais forcer un filtre plus sombre sur le fond et flouter légèrement les éléments secondaires pour faire ressortir la date du 25 en bleu/or. Je te montre le Figma à 11h.`;
      } else if (targetedId === "ai1") {
        customReply = `Ajustement du texte en cours : \n\n« Événement reporté au 25. Vos accès restent valides. Nous prenons toutes les mesures pour vous recevoir sereinement. Des questions ? Notre équipe reste à votre entière disposition. »`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          senderId: targetedId,
          senderName: targetName,
          senderAvatar: targetName.slice(0,2).toUpperCase(),
          avatarGradient: targetGradient,
          role: targetRole,
          content: customReply,
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          type: targetType
        }
      ]);
      setActiveSpeaker(null);
    }, 2500);
  }

  // Handle final tasks planning export
  function handlePlan() {
    setStep("completed");
    onPlanTasks(selectedAI.length + selectedHumans.length);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "calc(100vh - 120px)" }}>
      
      {/* ── Top Header Navigation ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--border)", paddingBottom: 14 }}>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "1px solid var(--border)", cursor: "pointer",
            width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-secondary)", transition: "all 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget).style.background = "var(--bg-subtle)"}
          onMouseLeave={e => (e.currentTarget).style.background = "none"}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Réunion de Cadrage Hybride</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
            <Sparkles size={11} color="var(--primary)" />
            Cadrage & brainstorming de projet
          </div>
        </div>
      </div>

      {/* ── STEP 1 : SETUP ── */}
      {step === "setup" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, overflowY: "auto", flex: 1 }}>
          
          {/* Brief details (Left Column) */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              1. Cadrage du Briefing
            </h3>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Titre du projet / réunion
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="ex: Lancement Produit X"
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                  background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                  fontFamily: "var(--font-sans)", boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Client cible
                </label>
                <select
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  style={{
                    width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                    background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {mockClients.filter(c => c.status === "active").map(c => (
                    <option key={c.id} value={c.id}>{c.name} — ({c.sector})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Prompt Global / Description du brief
              </label>
              <textarea
                value={brief}
                onChange={e => setBrief(e.target.value)}
                rows={6}
                placeholder="Décrivez les objectifs, le canal, le ton et les contraintes du projet..."
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                  background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, lineHeight: 1.6,
                  outline: "none", fontFamily: "var(--font-sans)", resize: "vertical", boxSizing: "border-box"
                }}
              />
            </div>

            {/* Attachments simulator */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Documents & Références liés (Optionnel)
              </label>
              <div style={{
                padding: "14px", border: "1.5px dashed var(--border)", borderRadius: 8,
                background: "var(--bg-subtle)", textAlign: "center", fontSize: 12, color: "var(--text-muted)",
              }}>
                Glisser des guides de marque, PDF ou images de référence pour cette réunion
              </div>
            </div>
          </div>

          {/* Casting Selection (Right Column) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            
            {/* Humans checklist */}
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Users size={14} color="var(--primary)" />
                2. Casting Humain
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {mockTeamMembers.map(member => {
                  const checked = selectedHumans.includes(member.id);
                  return (
                    <div
                      key={member.id}
                      onClick={() => toggleHuman(member.id)}
                      style={{
                        padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                        border: `1.5px solid ${checked ? "var(--primary)" : "var(--border)"}`,
                        background: checked ? "linear-gradient(135deg, #EFF6FF10, #2563EB05)" : "var(--bg-subtle)",
                        display: "flex", alignItems: "center", justifyItems: "center", gap: 10,
                        transition: "all 0.12s",
                      }}
                    >
                      <input type="checkbox" checked={checked} readOnly style={{ accentColor: "var(--primary)" }} />
                      <div style={{
                        width: 26, height: 26, borderRadius: 6, background: "var(--border-strong)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white"
                      }}>
                        {member.avatar}
                      </div>
                      <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{member.name}</div>
                        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{member.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Agents checklist */}
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <Bot size={14} color="#7C3AED" />
                3. Casting IA
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {agents.map(agent => {
                  const checked = selectedAI.includes(agent.id);
                  const isBlocked = agent.keyStatus !== "valid";
                  return (
                    <div
                      key={agent.id}
                      onClick={() => !isBlocked && toggleAI(agent.id)}
                      style={{
                        padding: "8px 10px", borderRadius: 8,
                        cursor: isBlocked ? "not-allowed" : "pointer",
                        border: `1.5px solid ${checked ? "#7C3AED" : "var(--border)"}`,
                        background: checked ? "linear-gradient(135deg, #F5F3FF10, #7C3AED05)" : "var(--bg-subtle)",
                        display: "flex", alignItems: "center", justifyItems: "center", gap: 10,
                        opacity: isBlocked ? 0.5 : 1,
                        transition: "all 0.12s",
                      }}
                    >
                      <input type="checkbox" checked={checked} disabled={isBlocked} readOnly style={{ accentColor: "#7C3AED" }} />
                      <div style={{
                        width: 26, height: 26, borderRadius: 6, background: agent.avatarGradient,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white"
                      }}>
                        {agent.avatar}
                      </div>
                      <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{agent.name}</div>
                        <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{agent.role} {isBlocked && "⚠️ (clé)"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={startMeeting}
              disabled={selectedAI.length === 0 && selectedHumans.length === 0}
              style={{
                padding: 12, borderRadius: 10, border: "none",
                background: "var(--primary)", color: "white",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 4px 6px -1px rgba(37,99,235,0.2)"
              }}
            >
              <Play size={14} />
              Lancer la réunion
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2 : ACTIVE WAR ROOM RUNNING ── */}
      {step === "running" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, flex: 1, minHeight: 0 }}>
          
          {/* Chat area (Left Column) */}
          <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
            {/* Room Info Header */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MessageSquare size={16} color="var(--primary)" />
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>Discussion en direct — {title}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                Client : <strong>{client.name}</strong>
              </div>
            </div>

            {/* Chat message stream */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg) => {
                const isUser = msg.senderId === "user";
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      flexDirection: isUser ? "row-reverse" : "row",
                      alignItems: "flex-start",
                      gap: 12,
                      maxWidth: "85%",
                      alignSelf: isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: msg.avatarGradient || "linear-gradient(135deg, #2563EB, #7C3AED)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {msg.senderAvatar}
                    </div>

                    {/* Bubble box */}
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4, flexDirection: isUser ? "row-reverse" : "row" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{msg.senderName}</span>
                        <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600 }}>{msg.role}</span>
                        <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{msg.time}</span>
                      </div>
                      
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: 12,
                          background: isUser ? "var(--primary)" : "var(--bg-subtle)",
                          color: isUser ? "white" : "var(--text-primary)",
                          fontSize: 13,
                          lineHeight: 1.5,
                          whiteSpace: "pre-line",
                          border: isUser ? "none" : "1px solid var(--border)",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation feedback */}
              {activeSpeaker !== null && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite", color: "var(--primary)" }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", fontStyle: "italic" }}>
                    {typingText}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input prompt area */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={activeSpeaker !== null}
                  placeholder={activeSpeaker !== null ? "Veuillez attendre la fin du tour de table..." : "Interagir avec l'équipe (ex: @Thomas : simplifie le concept...)"}
                  style={{
                    flex: 1, padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)",
                    background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13.5, outline: "none",
                    fontFamily: "var(--font-sans)"
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || activeSpeaker !== null}
                  style={{
                    padding: "11px 16px", borderRadius: 10, border: "none",
                    background: userInput.trim() && activeSpeaker === null ? "var(--primary)" : "var(--bg-muted)",
                    color: userInput.trim() && activeSpeaker === null ? "white" : "var(--text-muted)",
                    cursor: userInput.trim() && activeSpeaker === null ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Right column: Deliverables checklist & export */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            
            {/* List of active participants in the war room */}
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={14} color="var(--primary)" />
                Équipe Réunie
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {mockTeamMembers.filter(h => selectedHumans.includes(h.id)).map(h => (
                  <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                    <div style={{ fontWeight: 600 }}>{h.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 10 }}>({h.role})</div>
                  </div>
                ))}
                {agents.filter(a => selectedAI.includes(a.id)).map(a => (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: activeSpeaker === a.id ? "#2563EB" : "#10B981" }} />
                    <div style={{ fontWeight: 600 }}>{a.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 10 }}>({a.role})</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables summary */}
            <div className="card" style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <ClipboardList size={14} color="var(--primary)" />
                Livrables Générés
              </h3>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {deliverables.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPreview(item)}
                    style={{
                      padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.background = "white";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--bg-subtle)";
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      <Eye size={11} color="var(--text-muted)" />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Généré par {item.source}</div>
                  </div>
                ))}
              </div>

              {/* Action trigger button */}
              <button
                onClick={handlePlan}
                disabled={activeSpeaker !== null}
                style={{
                  width: "100%", padding: "10px", borderRadius: 8, border: "none",
                  background: activeSpeaker === null ? "var(--primary)" : "var(--bg-muted)",
                  color: activeSpeaker === null ? "white" : "var(--text-muted)",
                  fontSize: 12, fontWeight: 600, cursor: activeSpeaker === null ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  fontFamily: "var(--font-sans)", transition: "all 0.15s",
                  marginTop: 14
                }}
              >
                <CheckCircle size={13} />
                Planifier les publications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3 : COMPLETED EXPORTED WORK ── */}
      {step === "completed" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, alignItems: "stretch", flex: 1, minHeight: 0 }}>
          {/* Status Message (Left Column) */}
          <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center", gap: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
              border: "2px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#10B981"
            }}>
              <CheckCircle size={32} />
            </div>
            
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>Réunion terminée & Validée !</h2>
              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.6, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
                Les livrables (posts rédigés, prompts créatifs, scripts vidéo et gabarits de maquette) ont été planifiés dans le **Calendrier Éditorial** de {client.name} et les tâches associées ont été créées.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 18px", borderRadius: 8, cursor: "pointer",
                  border: "1px solid var(--border)", background: "transparent",
                  color: "var(--text-secondary)", fontSize: 12.5, fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Retour à l'équipe
              </button>
              <button
                onClick={() => {
                  setStep("setup");
                  setMessages([]);
                }}
                style={{
                  padding: "10px 22px", borderRadius: 8, cursor: "pointer",
                  border: "none", background: "var(--primary)",
                  color: "white", fontSize: 12.5, fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Lancer un autre brief
              </button>
            </div>
          </div>

          {/* Deliverables List (Right Column) */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <ClipboardList size={16} color="var(--primary)" />
              Livrables générés planifiés
            </h3>
            <p style={{ fontSize: 11.5, color: "var(--text-secondary)", marginBottom: 16 }}>
              Cliquez sur un livrable pour prévisualiser son contenu détaillé ou le copier.
            </p>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {deliverables.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPreview(item)}
                  style={{
                    padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)",
                    background: "var(--bg-subtle)", cursor: "pointer", transition: "all 0.15s",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.background = "white";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg-subtle)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--bg-app)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.icon}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)" }}>{item.title}</div>
                      <div style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 2 }}>{item.source}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, color: "var(--primary)", fontWeight: 700 }}>Aperçu →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DELIVERABLE PREVIEW MODAL OVERLAY ── */}
      {selectedPreview && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: 20
        }}>
          <div style={{
            width: "100%", maxWidth: 840, background: "var(--bg)",
            borderRadius: 16, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", maxHeight: "90vh",
            border: "1px solid var(--border)", overflow: "hidden"
          }}>
            {/* Header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "var(--bg-subtle)"
            }}>
              <div style={{ textAlign: "left" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, background: "rgba(37,99,235,0.1)",
                  color: "var(--primary)", padding: "2px 8px", borderRadius: 4,
                  textTransform: "uppercase", letterSpacing: "0.05em"
                }}>
                  {selectedPreview.content.badge}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginTop: 6, marginBottom: 0 }}>
                  {selectedPreview.content.title}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedPreview(null); setCopied(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", display: "flex", padding: 6, borderRadius: "50%"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-app)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body Container (Scrollable) */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, padding: 20, overflowY: "auto", flex: 1 }}>
              
              {/* Left Column: Details & Texts */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Rédacteur / Concepteur
                  </label>
                  <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>
                    {selectedPreview.source}
                  </div>
                </div>

                {selectedPreview.type === "prompt" ? (
                  <>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Prompt d'Illustration IA (Midjourney/SD)
                      </label>
                      <div style={{
                        padding: 12, borderRadius: 8, background: "var(--bg-app)",
                        border: "1px solid var(--border)", fontFamily: "monospace",
                        fontSize: 11.5, color: "var(--text-primary)", whiteSpace: "pre-wrap",
                        lineHeight: 1.5, position: "relative"
                      }}>
                        {selectedPreview.content.promptText}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Instructions d'utilisation
                      </label>
                      <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                        {selectedPreview.content.instructions}
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Texte Généré
                    </label>
                    <div style={{
                      padding: 14, borderRadius: 10, background: "var(--bg-app)",
                      border: "1px solid var(--border)", fontSize: 12.5,
                      color: "var(--text-primary)", whiteSpace: "pre-wrap",
                      lineHeight: 1.6, overflowY: "auto", maxHeight: 300
                    }}>
                      {selectedPreview.content.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Visual Mockup / Rendering Simulation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 0, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>
                  Aperçu visuel simulé
                </label>

                {selectedPreview.type === "linkedin" && (
                  /* LinkedIn Feed Card Mockup */
                  <div style={{
                    border: "1px solid #E5E7EB", borderRadius: 10, background: "white",
                    padding: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.03)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    textAlign: "left"
                  }}>
                    {/* User profile row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: client.logoColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        {client.logo}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{client.name}</div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>10 240 abonnés · Sponsorisé</div>
                      </div>
                    </div>
                    {/* Short excerpt */}
                    <p style={{ fontSize: 11, color: "#1F2937", margin: "0 0 8px 0", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {selectedPreview.content.text}
                    </p>
                    {/* Media image */}
                    {selectedPreview.content.mediaUrl && (
                      <div style={{ position: "relative", width: "100%", height: 160, borderRadius: 6, overflow: "hidden", background: "#F3F4F6", marginBottom: 8 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedPreview.content.mediaUrl} alt="LinkedIn Post Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    {/* Action footer mockup */}
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #F3F4F6", paddingTop: 8, fontSize: 10, color: "#4B5563", fontWeight: 600 }}>
                      <span>👍 J'aime</span>
                      <span>💬 Commenter</span>
                      <span>🔁 Partager</span>
                      <span>🚀 Envoyer</span>
                    </div>
                  </div>
                )}

                {selectedPreview.type === "prompt" && (
                  /* Image mockup with crop format overlay */
                  <div style={{
                    border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden",
                    background: "var(--bg-subtle)", position: "relative"
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedPreview.content.mediaUrl} alt="AI Illustration Preview" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                    <div style={{
                      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                      justifyContent: "space-between", padding: 12, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
                      textAlign: "left"
                    }}>
                      <span style={{ alignSelf: "flex-end", fontSize: 9, background: "rgba(0,0,0,0.7)", color: "white", padding: "3px 6px", borderRadius: 4, fontWeight: 700 }}>
                        Format 4:5 (Standard)
                      </span>
                      <span style={{ fontSize: 10.5, color: "white", fontWeight: 600, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        Illustration conceptuelle générée par l'IA
                      </span>
                    </div>
                  </div>
                )}

                {selectedPreview.type === "script" && (
                  /* Vertical Phone Frame Mockup for Reel */
                  <div style={{
                    width: 170, height: 260, border: "6px solid #1E293B", borderRadius: 24,
                    alignSelf: "center", background: "#0F172A", position: "relative",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", overflow: "hidden"
                  }}>
                    {/* Simulated video background */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1544025162-d76694265947?w=400&fit=crop')`,
                      backgroundSize: "cover", backgroundPosition: "center"
                    }} />
                    {/* Simulated user card */}
                    <div style={{ position: "relative", zIndex: 5, padding: 10, display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: client.logoColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700 }}>
                          {client.logo}
                        </div>
                        <span style={{ fontSize: 8, color: "white", fontWeight: 700 }}>{client.name}</span>
                      </div>
                      {/* Subtitles mockup */}
                      <div style={{
                        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)",
                        borderRadius: 4, padding: "4px 6px", fontSize: 8, color: "white",
                        textAlign: "center", border: "1px solid rgba(255,255,255,0.1)",
                        margin: "4px 0"
                      }}>
                        💬 "Pour vous offrir la meilleure expérience possible..."
                      </div>
                      <div style={{ fontSize: 7, color: "rgba(255,255,255,0.8)" }}>
                        ♫ Son original · Créateur de contenu
                      </div>
                    </div>
                    {/* Phone Notch */}
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 60, height: 10, background: "#1E293B", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10 }} />
                  </div>
                )}

                {selectedPreview.type === "figma" && (
                  /* Figma board layout simulation */
                  <div style={{
                    border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden",
                    background: "var(--bg-subtle)", display: "flex", flexDirection: "column"
                  }}>
                    {/* Figma toolbar */}
                    <div style={{ padding: "6px 10px", background: "#2C2C2C", display: "flex", gap: 6, alignItems: "center", textAlign: "left" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF5F56" }} />
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFBD2E" }} />
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#27C93F" }} />
                      <span style={{ fontSize: 8, color: "#AAAAAA", fontFamily: "monospace", marginLeft: 4 }}>Affiche_Lancement_V2_25.fig</span>
                    </div>
                    {/* Figma Canvas mockup */}
                    <div style={{ position: "relative", width: "100%", height: 180, background: "#1E1E1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
                      <div style={{
                        width: 110, height: 145, background: "#F8FAFC", border: "1.5px solid #D97706",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "space-between", padding: 10, position: "relative"
                      }}>
                        {/* Poster elements */}
                        <div style={{ fontSize: 5, fontWeight: 700, color: "#1E293B" }}>{client.name.toUpperCase()}</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#D97706", margin: "4px 0" }}>25</div>
                        <div style={{ fontSize: 4, color: "#64748B", textAlign: "center" }}>RECONTRER · ÉCHANGER · CO-CONSTRUIRE</div>
                        {/* Ruler guidelines mockup overlay */}
                        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", borderTop: "1px dashed rgba(37,99,235,0.4)" }} />
                        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", borderLeft: "1px dashed rgba(37,99,235,0.4)" }} />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "12px 20px", borderTop: "1px solid var(--border)",
              display: "flex", justifyContent: "flex-end", gap: 10,
              background: "var(--bg-subtle)"
            }}>
              <button
                onClick={() => { setSelectedPreview(null); setCopied(false); }}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
                  background: "transparent", color: "var(--text-secondary)", fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", fontFamily: "var(--font-sans)"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const contentToCopy = selectedPreview.type === "prompt" 
                    ? selectedPreview.content.promptText 
                    : selectedPreview.content.text;
                  navigator.clipboard.writeText(contentToCopy);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  padding: "8px 18px", borderRadius: 8, border: "none",
                  background: "var(--primary)", color: "white", fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-sans)"
                }}
              >
                {copied ? <Check size={13} /> : <Save size={13} />}
                <span>{copied ? "Copié !" : "Copier le texte"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
