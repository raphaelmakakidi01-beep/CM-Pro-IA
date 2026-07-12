"use client";
import { formatNumber } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  engagement: number;
  reach: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "var(--shadow-md)",
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 12, color: "#2563EB" }}>Engagement: {payload[0]?.value}%</div>
        <div style={{ fontSize: 12, color: "#7C3AED" }}>Portée: {formatNumber(payload[1]?.value)}</div>
      </div>
    );
  }
  return null;
};

export default function AreaChartWidget({ data }: { data: DataPoint[] }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>Performance 30 jours</h3>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Engagement & Portée — tous clients</p>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: "#2563EB" }} />
            <span style={{ color: "var(--text-secondary)" }}>Engagement</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: "#7C3AED" }} />
            <span style={{ color: "var(--text-secondary)" }}>Portée</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} interval={4} />
          <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="engagement" stroke="#2563EB" strokeWidth={2} fill="url(#gradBlue)" dot={false} />
          <Area type="monotone" dataKey="reach" stroke="#7C3AED" strokeWidth={2} fill="url(#gradViolet)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
