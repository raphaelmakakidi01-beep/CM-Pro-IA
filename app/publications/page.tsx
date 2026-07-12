"use client";
import { useState } from "react";
import { mockTodayPosts, mockClients, networkColors } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { Plus, Eye, Pencil, Trash2, Music2, Search, SlidersHorizontal, Calendar, Send } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const allPosts = [
  ...mockTodayPosts,
  { id: "px1", client: "Client Technologie", clientLogo: "CT", clientColor: "#2563EB", network: "twitter",   format: "Thread",    time: "2026-07-11 08:00", status: "scheduled", caption: "Veille technologique : Top 5 tendances IA de la semaine" },
  { id: "px2", client: "Client Immobilier",  clientLogo: "CI", clientColor: "#10B981", network: "linkedin",  format: "Carrousel", time: "2026-07-11 09:00", status: "draft",      caption: "Présentation immobilière : Villa vue mer" },
  { id: "px3", client: "Client E-commerce",  clientLogo: "CE", clientColor: "#7C3AED", network: "instagram", format: "Carrousel", time: "2026-07-12 10:00", status: "scheduled", caption: "Lookbook été — 7 looks à adopter cette saison" },
  { id: "px4", client: "Client Cosmétiques", clientLogo: "CC", clientColor: "#84CC16", network: "instagram", format: "Reel",      time: "2026-07-12 09:00", status: "scheduled", caption: "Routine soin matinal en 5 étapes simples" },
  { id: "px5", client: "Client Tourisme",    clientLogo: "CT", clientColor: "#0EA5E9", network: "facebook",  format: "Image",     time: "2026-07-12 11:00", status: "draft",      caption: "Offre exclusive été : -15% sur vos voyages" },
];

const networkIconMap: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon size={13} />,
  facebook:  <FacebookIcon  size={13} />,
  linkedin:  <LinkedinIcon  size={13} />,
  tiktok:    <Music2        size={13} />,
  youtube:   <YoutubeIcon   size={13} />,
  twitter:   <TwitterIcon   size={13} />,
};

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  scheduled: { label: "Programmé",  dot: "#2563EB", bg: "#EFF6FF", text: "#2563EB" },
  published:  { label: "Publié",    dot: "#10B981", bg: "#ECFDF5", text: "#059669" },
  draft:      { label: "Brouillon", dot: "#94A3B8", bg: "#F1F5F9", text: "#64748B" },
  review:     { label: "En revue",  dot: "#F59E0B", bg: "#FFFBEB", text: "#D97706" },
};

const STATS = [
  { label: "Total", count: allPosts.length, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Programmées", count: allPosts.filter(p => p.status === "scheduled").length, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Publiées", count: allPosts.filter(p => p.status === "published").length, color: "#10B981", bg: "#ECFDF5" },
  { label: "Brouillons", count: allPosts.filter(p => p.status === "draft").length, color: "#94A3B8", bg: "#F1F5F9" },
];

function formatDateTime(dt: string) {
  const [date, time] = dt.split(" ");
  const d = new Date(date);
  const day = d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  return { day, time };
}

export default function PublicationsPage() {
  const [statusFilter, setStatusFilter]   = useState("all");
  const [networkFilter, setNetworkFilter] = useState("all");
  const [search, setSearch]               = useState("");

  const filtered = allPosts.filter((p) => {
    const matchStatus  = statusFilter  === "all" || p.status  === statusFilter;
    const matchNetwork = networkFilter === "all" || p.network === networkFilter;
    const matchSearch  = !search || p.client.toLowerCase().includes(search.toLowerCase()) || p.caption.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchNetwork && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Publications</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Gérez et suivez toutes vos publications sur l'ensemble de vos clients
          </p>
        </div>
      </div>

      {/* ── KPI strip ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {STATS.map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, flex: 1 }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Send size={15} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{s.count}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="input"
            style={{ paddingLeft: 32, fontSize: 13 }}
            placeholder="Rechercher une publication..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 4, background: "var(--bg-muted)", borderRadius: 9, padding: "3px" }}>
          {(["all", "scheduled", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "5px 12px", borderRadius: 7, border: "none",
                fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: statusFilter === s ? "var(--bg)" : "transparent",
                color: statusFilter === s ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: statusFilter === s ? "var(--shadow-sm)" : "none",
              }}
            >
              {s === "all" ? "Tous" : STATUS_CONFIG[s]?.label}
            </button>
          ))}
        </div>

        {/* Network pills */}
        <div style={{ display: "flex", gap: 5 }}>
          {(["all", "instagram", "facebook", "linkedin", "tiktok"] as const).map((n) => {
            const active = networkFilter === n;
            const color = networkColors[n] || "var(--primary)";
            return (
              <button
                key={n}
                onClick={() => setNetworkFilter(n)}
                style={{
                  padding: "5px 11px", borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${active ? color + "55" : "var(--border)"}`,
                  background: active ? color + "12" : "var(--bg)",
                  color: active ? color : "var(--text-secondary)",
                }}
              >
                {n !== "all" && networkIconMap[n]}
                {n === "all" ? "Tous" : n.charAt(0).toUpperCase() + n.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card" style={{ overflow: "hidden", padding: 0 }}>
        {/* Table head */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "40px 140px 1fr 100px 90px 110px 100px 100px",
          alignItems: "center",
          padding: "10px 20px",
          background: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border)",
        }}>
          {["", "Client", "Contenu", "Format", "Réseau", "Date", "Statut", "Actions"].map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h === "Actions" ? "right" : "left" }}>{h}</div>
          ))}
        </div>

        {/* Table rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
            Aucune publication ne correspond à vos filtres
          </div>
        ) : (
          filtered.map((post, i) => {
            const statusCfg = STATUS_CONFIG[post.status] ?? STATUS_CONFIG.draft;
            const netColor  = networkColors[post.network] || "#888";
            const { day, time } = formatDateTime(post.time);
            return (
              <div
                key={post.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 140px 1fr 100px 90px 110px 100px 100px",
                  alignItems: "center",
                  padding: "13px 20px",
                  borderTop: i === 0 ? "none" : "1px solid var(--border)",
                  transition: "background 0.12s",
                  cursor: "pointer",
                  gap: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {/* Index */}
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{i + 1}</div>

                {/* Client */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: post.clientColor + "20",
                    border: `1.5px solid ${post.clientColor}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: post.clientColor,
                  }}>
                    {post.clientLogo}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {post.client}
                  </span>
                </div>

                {/* Caption */}
                <div style={{ paddingRight: 20, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.caption}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6,
                    background: "var(--bg-muted)", color: "var(--text-secondary)",
                  }}>
                    {post.format}
                  </span>
                </div>

                {/* Network */}
                <div>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 6,
                    background: netColor + "15", color: netColor,
                  }}>
                    {networkIconMap[post.network]}
                    {post.network.charAt(0).toUpperCase() + post.network.slice(1)}
                  </span>
                </div>

                {/* Date */}
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{day}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{time}</span>
                </div>

                {/* Status */}
                <div>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
                    background: statusCfg.bg, color: statusCfg.text,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusCfg.dot, display: "inline-block", flexShrink: 0 }} />
                    {statusCfg.label}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                  <button
                    title="Aperçu"
                    style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.12s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-muted)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
                  >
                    <Eye size={12} />
                  </button>
                  <button
                    title="Modifier"
                    style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.12s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; (e.currentTarget as HTMLElement).style.background = "#EFF6FF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    title="Supprimer"
                    style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.12s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EF4444"; (e.currentTarget as HTMLElement).style.background = "#FEF2F2"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} publication{filtered.length > 1 ? "s" : ""} affichée{filtered.length > 1 ? "s" : ""}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {allPosts.length} au total
          </span>
        </div>
      </div>
    </div>
  );
}
