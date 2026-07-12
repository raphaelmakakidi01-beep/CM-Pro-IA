"use client";
import { useState } from "react";
import { mockClients } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import {
  Users, Plus, Search, ExternalLink, Pencil, Sparkles, Music2, X, Check, Save, Upload, Trash2, AlertTriangle, Play, Pause, Target, TrendingUp,
} from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import Link from "next/link";

const networkIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon size={11} />,
  facebook: <FacebookIcon size={11} />,
  linkedin: <LinkedinIcon size={11} />,
  tiktok: <Music2 size={11} />,
  twitter: <TwitterIcon size={11} />,
  youtube: <YoutubeIcon size={11} />,
};

const networkColors: Record<string, string> = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  tiktok: "#111",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
};

const logoColors = [
  { name: "Orange", hex: "#F59E0B" },
  { name: "Bleu", hex: "#2563EB" },
  { name: "Violet", hex: "#7C3AED" },
  { name: "Vert", hex: "#10B981" },
  { name: "Rouge", hex: "#EF4444" },
  { name: "Bleu ciel", hex: "#0EA5E9" },
  { name: "Lime", hex: "#84CC16" },
  { name: "Indigo", hex: "#6366F1" },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  // Form States
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [logo, setLogo] = useState(""); // base64 string or initials
  const [logoColor, setLogoColor] = useState("#2563EB");
  const [description, setDescription] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("1500");
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(["instagram", "facebook"]);

  // Targets Form States
  const [postsInstagram, setPostsInstagram] = useState("12");
  const [postsLinkedin, setPostsLinkedin] = useState("8");
  const [primaryKpiGoal, setPrimaryKpiGoal] = useState("engagement");
  const [growthTarget, setGrowthTarget] = useState("");

  const filtered = clients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleNetwork = (net: string) => {
    setSelectedNetworks(prev =>
      prev.includes(net) ? prev.filter(x => x !== net) : [...prev, net]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sector.trim()) return;

    // Calculate default initials if logo is empty
    const finalLogo = logo.trim() || name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "CL";

    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? {
        ...c,
        name,
        sector,
        logo: finalLogo,
        logoColor,
        monthlyBudget: parseFloat(monthlyBudget) || 1000,
        description,
        networks: selectedNetworks,
        postsInstagram: parseInt(postsInstagram) || 0,
        postsLinkedin: parseInt(postsLinkedin) || 0,
        monthlyPostTarget: (parseInt(postsInstagram) || 0) + (parseInt(postsLinkedin) || 0),
        primaryKpiGoal,
        growthTarget,
      } : c));
      setEditingClient(null);
    } else {
      const newClient = {
        id: `c${Date.now()}`,
        name,
        sector,
        logo: finalLogo,
        logoColor,
        status: "active",
        networks: selectedNetworks,
        followers: 1200,
        engagement: 3.5,
        monthlyBudget: parseFloat(monthlyBudget) || 1000,
        nextPost: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        description,
        progress: 0,
        postsThisMonth: 0,
        postsInstagram: parseInt(postsInstagram) || 0,
        postsLinkedin: parseInt(postsLinkedin) || 0,
        monthlyPostTarget: (parseInt(postsInstagram) || 0) + (parseInt(postsLinkedin) || 0),
        postsDelivered: 0,
        primaryKpiGoal,
        growthTarget,
      };
      setClients([newClient, ...clients]);
    }

    setModalOpen(false);

    // Reset Form
    setName("");
    setSector("");
    setLogo("");
    setLogoColor("#2563EB");
    setDescription("");
    setMonthlyBudget("1500");
    setSelectedNetworks(["instagram", "facebook"]);
    setPostsInstagram("12");
    setPostsLinkedin("8");
    setPrimaryKpiGoal("engagement");
    setGrowthTarget("");
  };

  const triggerFileSelect = () => {
    const fileInput = document.getElementById("logo-upload-input") as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  // Helper to render client logo (base64 image or initials)
  const renderLogo = (clientLogo: string, clientColor: string, size = 48) => {
    const isImage = clientLogo.startsWith("data:image/") || clientLogo.startsWith("http");
    if (isImage) {
      return (
        <img
          src={clientLogo}
          alt="Logo"
          style={{
            width: size,
            height: size,
            borderRadius: 12,
            objectFit: "cover",
            border: "1px solid var(--border)",
            flexShrink: 0
          }}
        />
      );
    }
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: clientColor + "22",
        border: `2px solid ${clientColor}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 800,
        color: clientColor,
        flexShrink: 0,
      }}>
        {clientLogo}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Clients</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{clients.length} clients · {clients.filter(c => c.status === "active").length} actifs</p>
        </div>
        <button
          onClick={() => {
            setEditingClient(null);
            setName("");
            setSector("");
            setLogo("");
            setLogoColor("#2563EB");
            setDescription("");
            setMonthlyBudget("1500");
            setSelectedNetworks(["instagram", "facebook"]);
            setModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ padding: "9px 18px", display: "flex", alignItems: "center", gap: 7 }}
        >
          <Plus size={15} />
          Nouveau client
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "0 0 300px" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="input"
            style={{ paddingLeft: 32 }}
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "active", "paused", "review"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                borderColor: filter === s ? "var(--primary)" : "var(--border)",
                background: filter === s ? "#EFF6FF" : "var(--bg)",
                color: filter === s ? "var(--primary)" : "var(--text-secondary)",
              }}
            >
              {s === "all" ? "Tous" : getStatusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map((client) => (
          <div key={client.id} className="card" style={{ padding: 16, display: "flex", flexDirection: "column" }}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
              {renderLogo(client.logo, client.logoColor, 48)}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {client.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{client.sector}</div>
              </div>
              <span
                className={getStatusColor(client.status)}
                style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}
              >
                {getStatusLabel(client.status)}
              </span>
            </div>

            {/* Networks */}
            <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
              {client.networks.map((net) => (
                <div key={net} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: networkColors[net] + "12",
                  color: networkColors[net],
                  fontSize: 11,
                  fontWeight: 500,
                }}>
                  {networkIcons[net]}
                  <span style={{ textTransform: "capitalize" }}>{net}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              {[
                { label: "Abonnés", value: client.followers >= 1000 ? (client.followers / 1000).toFixed(1) + "K" : client.followers },
                { label: "Engagement", value: `${client.engagement}%` },
                { label: "Budget/mois", value: `${client.monthlyBudget} €` },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Pacing calculation */}
            {(() => {
              const currentDay = new Date().getDate();
              const totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
              const elapsedPercent = (currentDay / totalDays) * 100;
              
              const target = client.monthlyPostTarget || 12;
              const delivered = client.postsDelivered ?? Math.round((client.progress / 100) * target);
              const progressPercent = Math.min(100, Math.round((delivered / target) * 100));
              const isLagging = progressPercent < elapsedPercent - 15 && client.status === "active";
              const isPaused = client.status === "paused";

              return (
                <>
                  {/* Targets display */}
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                      background: "var(--bg-subtle)", border: "1px solid var(--border)",
                      color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: 4
                    }}>
                      <Target size={11} />
                      <span>{client.primaryKpiGoal === 'reach' ? 'Portée' :
                            client.primaryKpiGoal === 'engagement' ? 'Engagement' :
                            client.primaryKpiGoal === 'lead_gen' ? 'Clics & Leads' :
                            client.primaryKpiGoal === 'employer_branding' ? 'Marque Emp.' : 'Engagement'}</span>
                    </span>
                    {client.growthTarget && (
                      <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }} title="Objectif de croissance">
                        <TrendingUp size={11} />
                        <span>{client.growthTarget}</span>
                      </span>
                    )}
                  </div>

                  {/* Progress bar and pacing indicator */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--text-secondary)", marginBottom: 5 }}>
                      <span>Progression contrat</span>
                      <span style={{ fontWeight: 600 }}>{delivered} / {target} posts ({progressPercent}%)</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: "var(--bg-muted)", overflow: "hidden", marginBottom: 6 }}>
                      <div style={{
                        height: "100%", borderRadius: 99,
                        background: isPaused ? "var(--text-muted)" : (isLagging ? "#EF4444" : "#10B981"),
                        width: `${progressPercent}%`,
                        transition: "width 0.3s ease"
                      }} />
                    </div>
                    {isLagging && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "2px 8px", borderRadius: 4, background: "#FEF2F2",
                        color: "#EF4444", fontSize: 10, fontWeight: 700
                      }}>
                        <AlertTriangle size={11} />
                        Retard de production
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
              <Link href={`/clients/${client.id}`} style={{ flex: 1, textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ width: "100%", padding: "8px 0", fontSize: 12 }}>
                  <ExternalLink size={13} />
                  Ouvrir
                </button>
              </Link>
              <button
                onClick={() => {
                  setEditingClient(client);
                  setName(client.name);
                  setSector(client.sector);
                  setLogo(client.logo);
                  setLogoColor(client.logoColor);
                  setDescription(client.description || "");
                  setMonthlyBudget(String(client.monthlyBudget || 1500));
                  setSelectedNetworks(client.networks);
                  setPostsInstagram(String(client.postsInstagram ?? 12));
                  setPostsLinkedin(String(client.postsLinkedin ?? 8));
                  setPrimaryKpiGoal(client.primaryKpiGoal || "engagement");
                  setGrowthTarget(client.growthTarget || "");
                  setModalOpen(true);
                }}
                className="btn btn-secondary"
                style={{ padding: "8px 10px", fontSize: 12 }}
              >
                <Pencil size={13} />
              </button>
              <button
                className="btn"
                style={{
                  padding: "8px 10px",
                  fontSize: 12,
                  background: "linear-gradient(135deg, #EFF6FF, #EDE9FE)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  color: "#7C3AED",
                }}
              >
                <Sparkles size={13} />
              </button>
              <button
                onClick={() => {
                  setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: c.status === "paused" ? "active" : "paused" } : c));
                }}
                className="btn btn-secondary"
                style={{
                  padding: "8px 10px",
                  fontSize: 12,
                  color: client.status === "paused" ? "#10B981" : "#F59E0B",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
                title={client.status === "paused" ? "Activer le client" : "Mettre le client en pause"}
              >
                {client.status === "paused" ? <Play size={13} /> : <Pause size={13} />}
              </button>
              <button
                onClick={() => setDeleteConfirmId(client.id)}
                className="btn btn-secondary"
                style={{
                  padding: "8px 10px",
                  fontSize: 12,
                  color: "#EF4444",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FEF2F2"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── CLIENT CREATION & EDIT MODAL ── */}
      {modalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 200 }}
          />

          {/* Modal Box */}
          <div style={{
            position: "fixed",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%", maxWidth: 520,
            maxHeight: "90vh",
            background: "var(--bg)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            zIndex: 201,
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            animation: "scaleIn 0.15s ease-out"
          }}>
            {/* Header */}
            <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                {editingClient ? `Modifier le client : ${editingClient.name}` : "Créer une nouvelle marque / client"}
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", overflow: "hidden", flex: 1 }}>
              
              {/* Scrollable Fields Wrapper */}
              <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
                
                {/* Brand Logo File Upload */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Logo de la marque</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {logo.startsWith("data:image/") || logo.startsWith("http") ? (
                      <div style={{ position: "relative", width: 50, height: 50 }}>
                        <img src={logo} style={{ width: 50, height: 50, borderRadius: 10, objectFit: "cover", border: "1px solid var(--border)" }} />
                        <button
                          type="button"
                          onClick={() => setLogo("")}
                          style={{
                            position: "absolute", top: -6, right: -6,
                            background: "#EF4444", color: "white", border: "none", borderRadius: "50%",
                            width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", fontSize: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
                          }}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        background: logoColor + "15",
                        color: logoColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 800,
                        border: `1.5px dashed ${logoColor}40`,
                        textTransform: "uppercase"
                      }}>
                        {logo || name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "—"}
                      </div>
                    )}

                    <input
                      type="file"
                      id="logo-upload-input"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setLogo(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: "none" }}
                    />

                    <button
                      type="button"
                      onClick={triggerFileSelect}
                      style={{
                        padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
                        fontFamily: "var(--font-sans)"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--border)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                    >
                      <Upload size={13} />
                      Charger une image (.png, .svg)
                    </button>
                    
                    {logo && !logo.startsWith("data:") && (
                      <input
                        value={logo}
                        onChange={(e) => setLogo(e.target.value.slice(0, 2))}
                        placeholder="Initiales"
                        maxLength={2}
                        style={{
                          width: 70, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 12, outline: "none",
                          fontFamily: "var(--font-sans)", boxSizing: "border-box", textAlign: "center"
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Name & Sector */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Nom de la marque</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ex: TechNova"
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box", transition: "border 0.15s"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Secteur d'activité</label>
                    <input
                      required
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="ex: Restauration, SaaS..."
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* Color Pastilles (Checkmarks on Active) */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Couleur de marque</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {logoColors.map(lc => (
                      <button
                        type="button"
                        key={lc.hex}
                        onClick={() => setLogoColor(lc.hex)}
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: lc.hex, border: "1px solid rgba(0,0,0,0.1)",
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", transition: "transform 0.1s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        {logoColor === lc.hex && <Check size={14} strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Budget mensuel (€)</label>
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="1500"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                      fontFamily: "var(--font-sans)", boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Channels Selector */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Canaux / Réseaux sociaux</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {Object.keys(networkColors).map(net => {
                      const checked = selectedNetworks.includes(net);
                      return (
                        <button
                          type="button"
                          key={net}
                          onClick={() => toggleNetwork(net)}
                          style={{
                            padding: "8px 14px", borderRadius: 20,
                            border: checked ? `1.5px solid ${networkColors[net]}` : "1px solid var(--border)",
                            background: checked ? `${networkColors[net]}10` : "var(--bg)",
                            color: checked ? networkColors[net] : "var(--text-secondary)",
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 5, transition: "all 0.12s",
                            fontFamily: "var(--font-sans)"
                          }}
                        >
                          {networkIcons[net]}
                          <span style={{ textTransform: "capitalize" }}>{net}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Description rapide</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="ex: Restauration italienne bio, ciblant les familles..."
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                      fontFamily: "var(--font-sans)", boxSizing: "border-box", resize: "none", lineHeight: 1.5
                    }}
                  />
                </div>

                {/* ── Targets & Objectifs Client ── */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18, marginTop: 4 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Target size={14} style={{ color: "var(--primary)" }} />
                    <span>Objectifs & Contrat de diffusion</span>
                  </h4>
                  
                  {/* Quota Volume platform inputs */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Volume Instagram (posts/mois)</label>
                      <input
                        type="number"
                        value={postsInstagram}
                        onChange={(e) => setPostsInstagram(e.target.value)}
                        placeholder="12"
                        style={{
                          width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                          fontFamily: "var(--font-sans)", boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Volume LinkedIn (posts/mois)</label>
                      <input
                        type="number"
                        value={postsLinkedin}
                        onChange={(e) => setPostsLinkedin(e.target.value)}
                        placeholder="8"
                        style={{
                          width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                          fontFamily: "var(--font-sans)", boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  {/* Strategic KPI focus dropdown */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Objectif stratégique principal (KPI visé)</label>
                    <select
                      value={primaryKpiGoal}
                      onChange={(e) => setPrimaryKpiGoal(e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box", cursor: "pointer"
                      }}
                    >
                      <option value="reach">Notoriété & Portée (Reach / Impressions)</option>
                      <option value="engagement">Engagement & Communauté (Likes / Commentaires)</option>
                      <option value="lead_gen">Génération de Leads & Conversion (Clics / Ventes)</option>
                      <option value="employer_branding">Marque Employeur & Recrutement</option>
                    </select>
                  </div>

                  {/* Growth target text input */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Target de croissance chiffré (ex: abonnés, %)</label>
                    <input
                      value={growthTarget}
                      onChange={(e) => setGrowthTarget(e.target.value)}
                      placeholder="ex: Atteindre 15 000 abonnés d'ici fin décembre"
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Actions Footer (Fixed at the bottom) */}
              <div style={{
                display: "flex", gap: 10, justifyContent: "flex-end",
                padding: "16px 24px", borderTop: "1px solid var(--border)",
                background: "var(--bg)", flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: "10px 18px", borderRadius: 8, border: "1px solid var(--border)",
                    background: "transparent", color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "var(--font-sans)"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!name.trim() || !sector.trim()}
                  style={{
                    padding: "10px 20px", borderRadius: 8, border: "none",
                    background: name.trim() && sector.trim() ? "var(--primary)" : "var(--bg-muted)",
                    color: name.trim() && sector.trim() ? "white" : "var(--text-muted)",
                    fontSize: 13, fontWeight: 600, cursor: name.trim() && sector.trim() ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", gap: 6,
                    boxShadow: "0 1px 2px rgba(37,99,235,0.2)", fontFamily: "var(--font-sans)"
                  }}
                >
                  <Save size={15} />
                  {editingClient ? "Sauvegarder les modifications" : "Créer le client"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (() => {
        const clientToDelete = clients.find(c => c.id === deleteConfirmId);
        if (!clientToDelete) return null;
        return (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setDeleteConfirmId(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 300 }}
            />

            {/* Modal Box */}
            <div style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%", maxWidth: 420,
              background: "var(--bg)",
              borderRadius: 14,
              border: "1px solid var(--border)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              zIndex: 301,
              overflow: "hidden",
              padding: 20,
              display: "flex", flexDirection: "column", gap: 16
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#FEF2F2",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444", flexShrink: 0
                }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px 0" }}>Supprimer le client</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                    Êtes-vous sûr de vouloir supprimer le client <strong style={{ color: "var(--text-primary)" }}>{clientToDelete.name}</strong> ? 
                    Cette opération est <strong style={{ color: "#EF4444" }}>irréversible</strong> et supprimera définitivement toutes ses données associées.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  style={{
                    padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
                    background: "transparent", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: "var(--font-sans)"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setClients(prev => prev.filter(c => c.id !== deleteConfirmId));
                    setDeleteConfirmId(null);
                  }}
                  style={{
                    padding: "8px 16px", borderRadius: 8, border: "none",
                    background: "#EF4444", color: "white", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: "var(--font-sans)",
                    boxShadow: "0 1px 2px rgba(239,68,68,0.2)"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#DC2626"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#EF4444"; }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
