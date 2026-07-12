"use client";
import { motion } from "framer-motion";
import { mockActivities } from "@/lib/mock-data";
import { CheckCircle2, Calendar, Sparkles, AlertTriangle, FileText } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  publish: <CheckCircle2 size={14} color="#10B981" />,
  schedule: <Calendar size={14} color="#2563EB" />,
  ai: <Sparkles size={14} color="#7C3AED" />,
  alert: <AlertTriangle size={14} color="#F59E0B" />,
  report: <FileText size={14} color="#64748B" />,
};

const networkDot: Record<string, string> = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  tiktok: "#111",
  twitter: "#1DA1F2",
};

export function ActivityFeed() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600 }}>Activité récente</h3>
        <span style={{ fontSize: 12, color: "var(--primary)", cursor: "pointer", fontWeight: 500 }}>Tout voir</span>
      </div>
      <div>
        {mockActivities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "12px 20px",
              borderBottom: i < mockActivities.length - 1 ? "1px solid var(--border)" : "none",
              cursor: "pointer",
            }}
            whileHover={{ background: "var(--bg-subtle)" }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              {typeIcons[activity.type] || <CheckCircle2 size={14} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{activity.client}</span>
                {activity.network && (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: networkDot[activity.network] || "#888", flexShrink: 0 }} />
                )}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {activity.content}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
              {activity.time}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
