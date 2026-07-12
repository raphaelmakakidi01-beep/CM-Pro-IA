"use client";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface DataPoint {
  date: string;
  engagement: number;
  reach: number;
}

const networkData = [
  { name: "Instagram", followers: 54200, engagement: 5.8, color: "#E1306C" },
  { name: "Facebook", followers: 28900, engagement: 3.2, color: "#1877F2" },
  { name: "LinkedIn", followers: 18400, engagement: 4.1, color: "#0A66C2" },
  { name: "TikTok", followers: 13000, engagement: 7.4, color: "#111" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", boxShadow: "var(--shadow-md)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ fontSize: 12, color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.value > 100 ? formatNumber(p.value) : p.value}{p.name === "Engagement" ? "%" : ""}
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsCharts({ data }: { data: DataPoint[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
      {/* Area chart */}
      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Engagement & Portée — 30 jours</h3>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 16 }}>Tous clients confondus</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} interval={4} />
            <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="engagement" name="Engagement" stroke="#2563EB" strokeWidth={2} fill="url(#gBlue)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Répartition par réseau</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={networkData} dataKey="followers" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
              {networkData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {networkData.map((n) => (
            <div key={n.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: n.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, flex: 1 }}>{n.name}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{formatNumber(n.followers)}</span>
              <span style={{ fontSize: 11, color: n.engagement > 5 ? "#10B981" : "var(--text-secondary)" }}>{n.engagement}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
