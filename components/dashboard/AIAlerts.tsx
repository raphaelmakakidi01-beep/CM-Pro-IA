"use client";
import { motion } from "framer-motion";
import { mockAIAlerts } from "@/lib/mock-data";
import { Sparkles, TrendingDown, Lightbulb, X } from "lucide-react";
import { useState } from "react";

const alertConfig: Record<string, { icon: React.ReactNode; bg: string; border: string; label: string }> = {
  opportunity: {
    icon: <TrendingDown size={14} style={{ transform: "scaleY(-1)" }} />,
    bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
    border: "rgba(124,58,237,0.2)",
    label: "Opportunité",
  },
  warning: {
    icon: <TrendingDown size={14} />,
    bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
    border: "rgba(245,158,11,0.2)",
    label: "Alerte",
  },
  suggestion: {
    icon: <Lightbulb size={14} />,
    bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
    border: "rgba(37,99,235,0.2)",
    label: "Suggestion",
  },
};

export function AIAlerts() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = mockAIAlerts.filter((a) => !dismissed.includes(a.id));

  if (!visible.length) return null;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={12} color="white" />
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600 }}>Alertes IA</h3>
        <div style={{ marginLeft: "auto", background: "#EF4444", color: "white", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 99 }}>
          {visible.length}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {visible.map((alert, i) => {
          const cfg = alertConfig[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                margin: "12px 12px 0",
                marginBottom: i === visible.length - 1 ? 12 : 0,
                padding: "12px 14px",
                borderRadius: 10,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                position: "relative",
              }}
            >
              <button
                onClick={() => setDismissed((d) => [...d, alert.id])}
                style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}
              >
                <X size={12} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-secondary)" }}>{cfg.label}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>· {alert.client}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{alert.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{alert.message}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
