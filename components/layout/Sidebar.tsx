"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  LayoutDashboard, Users, Calendar, Wand2, Image, Video,
  Send, BarChart2, MessageSquare, FolderOpen, FileBarChart,
  CreditCard, Bot, Settings, ChevronLeft, ChevronRight,
  Sparkles, Plus,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord", section: null },
  { href: "/equipe?meeting=true", icon: MessageSquare, label: "Nouvelle Réunion", section: null },
  { href: "/clients", icon: Users, label: "Clients", section: null },
  { href: "/calendrier", icon: Calendar, label: "Calendrier", section: "Création" },
  { href: "/contenu-ia", icon: Wand2, label: "Contenu IA", section: "Création" },
  { href: "/images-ia", icon: Image, label: "Générateur Images", section: "Création" },
  { href: "/videos-ia", icon: Video, label: "Générateur Vidéos", section: "Création" },
  { href: "/publications", icon: Send, label: "Publications", section: "Diffusion" },
  { href: "/analytics", icon: BarChart2, label: "Analytics", section: "Diffusion" },
  { href: "/messages", icon: MessageSquare, label: "Messages", section: "Diffusion" },
  { href: "/bibliotheque", icon: FolderOpen, label: "Bibliothèque", section: "Ressources" },
  { href: "/rapports", icon: FileBarChart, label: "Rapports", section: "Ressources" },
  { href: "/facturation", icon: CreditCard, label: "Facturation", section: "Gestion" },
  { href: "/equipe", icon: Bot, label: "Équipe & Agents IA", section: "Gestion", badge: "IA" },
  { href: "/parametres", icon: Settings, label: "Paramètres", section: "Gestion" },
];

const sectionOrder = [null, "Création", "Diffusion", "Ressources", "Gestion"];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const pathname = usePathname();

  const width = sidebarCollapsed ? 68 : 240;

  const grouped: Record<string, typeof navItems> = {};
  for (const s of sectionOrder) {
    const key = s ?? "__home__";
    grouped[key] = navItems.filter((i) => i.section === s);
  }

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: "var(--sidebar-bg)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: sidebarCollapsed ? "20px 16px" : "20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          gap: 10,
          minHeight: 64,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} color="white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, color: "white", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                CM-IA PRO
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                Community AI Platform
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 8px" }}>
        {/* Nouveau Post CTA Button at the very top of navigation */}
        <div style={{ padding: sidebarCollapsed ? "6px 0" : "6px 10px 14px", marginBottom: 6 }}>
          <Link href="/contenu-ia" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: sidebarCollapsed ? "10px" : "10px 14px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                color: "white",
                fontSize: sidebarCollapsed ? 12 : 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: sidebarCollapsed ? 0 : 8,
                boxShadow: "0 4px 10px rgba(37,99,235,0.2)",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              title="Nouveau post"
            >
              <Plus size={15} style={{ flexShrink: 0 }} />
              {!sidebarCollapsed && <span>Nouveau post</span>}
            </button>
          </Link>
        </div>

        {sectionOrder.map((section) => {
          const key = section ?? "__home__";
          const items = grouped[key];
          if (!items?.length) return null;
          return (
            <div key={key} style={{ marginBottom: 4 }}>
              {section && !sidebarCollapsed && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.25)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "10px 10px 4px",
                  }}
                >
                  {section}
                </div>
              )}
              {items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                    <motion.div
                      whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: sidebarCollapsed ? "9px 18px" : "9px 10px",
                        borderRadius: 8,
                        marginBottom: 1,
                        background: isActive ? "rgba(37,99,235,0.25)" : "transparent",
                        color: isActive ? "white" : "var(--sidebar-text)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        position: "relative",
                        justifyContent: sidebarCollapsed ? "center" : "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--sidebar-hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            left: -8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 3,
                            height: 20,
                            borderRadius: 99,
                            background: "#2563EB",
                          }}
                        />
                      )}
                      <Icon size={16} style={{ flexShrink: 0 }} />
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, flex: 1 }}
                          >
                            {item.label}
                            {item.badge && (
                              <span style={{
                                fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4,
                                background: isActive ? "rgba(255,255,255,0.2)" : "rgba(124,58,237,0.25)",
                                color: isActive ? "white" : "#A78BFA",
                                letterSpacing: "0.04em",
                              }}>
                                {item.badge}
                              </span>
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={toggleSidebar}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarCollapsed ? "center" : "flex-end",
            padding: "8px 10px",
            borderRadius: 8,
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.color = "white"; (e.currentTarget).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.color = "rgba(255,255,255,0.3)"; (e.currentTarget).style.background = "transparent"; }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <ChevronLeft size={14} />
              Réduire
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
