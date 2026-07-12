"use client";

import { mockClients } from "@/lib/mock-data";
import { FileBarChart, Download, ExternalLink, Sparkles, TrendingUp, BarChart2, Users } from "lucide-react";

export default function RapportsPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Rapports</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Générez et exportez vos rapports clients</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "9px 18px" }}>
          <Sparkles size={15} />
          Générer un rapport
        </button>
      </div>

      {/* Client reports */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {mockClients.map((client, i) => (
          <div key={client.id || i} className="card" style={{ padding: 18, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: client.logoColor + "22", border: `2px solid ${client.logoColor}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: client.logoColor }}>
                {client.logo}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{client.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{client.sector}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { icon: BarChart2, label: "Posts", value: client.postsThisMonth },
                { icon: TrendingUp, label: "Engagement", value: `${client.engagement}%` },
                { icon: Users, label: "Abonnés", value: client.followers >= 1000 ? (client.followers / 1000).toFixed(1) + "K" : client.followers },
              ].map((stat, j) => (
                <div key={j} style={{ textAlign: "center", padding: "10px 6px", borderRadius: 8, background: "var(--bg-subtle)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: "8px 0", fontSize: 12 }}>
                <Sparkles size={13} />
                Générer
              </button>
              <button className="btn btn-secondary" style={{ padding: "8px 12px", fontSize: 12 }}>
                <Download size={13} />
                PDF
              </button>
              <button className="btn btn-secondary" style={{ padding: "8px 12px", fontSize: 12 }}>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
