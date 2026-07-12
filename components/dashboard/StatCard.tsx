"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  gradient: string;
  iconColor: string;
  delay?: number;
  invertTrendColor?: boolean; // If true, negative change is good (green), positive is bad (red)
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  gradient,
  iconColor,
  invertTrendColor = false,
}: StatCardProps) {
  const isPositive = change === undefined || change >= 0;

  // Determine trend color logically based on business context
  let trendColor = "#94A3B8"; // Neutral gray default
  if (change !== undefined) {
    if (invertTrendColor) {
      trendColor = change < 0 ? "#10B981" : "#EF4444"; // Decreasing is good (green), increasing is bad (red)
    } else {
      trendColor = change >= 0 ? "#10B981" : "#EF4444"; // Increasing is good (green), decreasing is bad (red)
    }
  }

  return (
    <div className="card" style={{ padding: "20px", cursor: "default", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: gradient,
          }}
        >
          <div style={{ color: iconColor }}>{icon}</div>
        </div>
        
        {change !== undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 12,
              fontWeight: 600,
              color: trendColor,
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? "+" : ""}{change}%
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, marginBottom: 4 }}>
          {value}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</div>
        {changeLabel && (
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{changeLabel}</div>
        )}
      </div>
    </div>
  );
}
