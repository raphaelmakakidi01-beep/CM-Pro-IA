"use client";
import { mockTodayPosts, networkColors } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function TodaySchedule() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600 }}>Publications aujourd'hui</h3>
        <span style={{ fontSize: 12, background: "var(--bg-muted)", padding: "2px 8px", borderRadius: 99, color: "var(--text-secondary)", fontWeight: 500 }}>
          {mockTodayPosts.length} posts
        </span>
      </div>
      <div>
        {mockTodayPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06 + 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 20px",
              borderBottom: i < mockTodayPosts.length - 1 ? "1px solid var(--border)" : "none",
              cursor: "pointer",
            }}
            whileHover={{ background: "var(--bg-subtle)" }}
          >
            {/* Client avatar */}
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: post.clientColor + "22",
              border: `2px solid ${post.clientColor}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: post.clientColor,
              flexShrink: 0,
            }}>
              {post.clientLogo}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{post.client}</span>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: networkColors[post.network] || "#888" }} />
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{post.format}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {post.caption}
              </div>
            </div>

            {/* Time & status */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: "var(--text-secondary)" }}>
                <Clock size={11} />
                {post.time}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 99 }} className={getStatusColor(post.status)}>
                {getStatusLabel(post.status)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
