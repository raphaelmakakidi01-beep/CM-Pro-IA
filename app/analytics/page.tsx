"use client";
import dynamic from "next/dynamic";
import { mockEngagementData } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, Users, Eye, MousePointerClick, DollarSign, ShoppingCart, Sparkles } from "lucide-react";

// Lazy-load heavy chart library
const AnalyticsCharts = dynamic(() => import("@/components/analytics/AnalyticsCharts"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
      <div className="skeleton" style={{ height: 280 }} />
      <div className="skeleton" style={{ height: 280 }} />
    </div>
  ),
});

const metricCards = [
  { label: "Engagement total", value: "4.4%", change: "+0.8%", icon: TrendingUp, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" },
  { label: "Portée globale", value: "284K", change: "+18%", icon: Eye, color: "#7C3AED", bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" },
  { label: "Nouveaux abonnés", value: "+2 840", change: "+6.2%", icon: Users, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" },
  { label: "Taux de clic", value: "3.1%", change: "+0.4%", icon: MousePointerClick, color: "#F59E0B", bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)" },
  { label: "Conversions", value: "1 240", change: "+22%", icon: ShoppingCart, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" },
  { label: "ROI moyen", value: "340%", change: "+45%", icon: DollarSign, color: "#7C3AED", bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" },
];

const topPosts = [
  { client: "Client E-commerce", content: "Lookbook été 2026", network: "Instagram", reach: 41200, engagement: 8.4, format: "Carrousel" },
  { client: "Client Cosmétiques", content: "Routine soin matinal", network: "TikTok", reach: 38700, engagement: 7.2, format: "Reel" },
  { client: "Client Restauration", content: "Chef en coulisses", network: "TikTok", reach: 35400, engagement: 6.9, format: "Vidéo" },
  { client: "Client Tourisme", content: "Maldives 2026", network: "Instagram", reach: 32100, engagement: 6.1, format: "Reel" },
  { client: "Client Technologie", content: "IA & relation client", network: "LinkedIn", reach: 28500, engagement: 5.7, format: "Article" },
];

const aiRecos = [
  { title: "Publiez des Reels", message: "Les Reels génèrent en moyenne 3.2x plus d'engagement que les posts statiques sur Instagram pour vos clients." },
  { title: "Meilleur horaire : Mardi 9h", message: "Vos publications LinkedIn du mardi matin obtiennent 68% de portée supplémentaire." },
  { title: "Augmentez les carrousels", message: "Les carrousels sur Instagram ont un taux de sauvegarde 4x supérieur aux autres formats pour le Client E-commerce." },
];

export default function AnalyticsPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Analytics</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Performance globale · Juillet 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["7j", "30j", "90j", "12m"].map((p) => (
            <button key={p} style={{
              padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, fontWeight: 500,
              background: p === "30j" ? "var(--primary)" : "var(--bg)",
              color: p === "30j" ? "white" : "var(--text-secondary)",
              cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 24 }}>
        {metricCards.map((card, i) => (
          <div key={i} className="card" style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon size={16} color={card.color} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#10B981" }}>{card.change}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{card.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts — lazy loaded */}
      <AnalyticsCharts data={mockEngagementData} />

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* Top posts */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Meilleures publications</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-subtle)" }}>
                {["Publication", "Client", "Réseau", "Portée", "Engagement"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--border)", cursor: "pointer" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "12px 16px", fontSize: 12 }}>{post.content}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{post.client}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{post.network}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600 }}>{formatNumber(post.reach)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: post.engagement > 7 ? "#10B981" : post.engagement > 5 ? "#F59E0B" : "#2563EB" }}>
                      {post.engagement}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendations */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Sparkles size={16} color="#7C3AED" />
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Recommandations IA</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {aiRecos.map((r, i) => (
              <div key={i} style={{
                padding: "12px", borderRadius: 10,
                background: i === 0 ? "linear-gradient(135deg, #F5F3FF, #EDE9FE)" : i === 1 ? "linear-gradient(135deg, #FFFBEB, #FEF3C7)" : "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
                border: `1px solid ${i === 0 ? "rgba(124,58,237,0.15)" : i === 1 ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)"}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5 }}>{r.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
