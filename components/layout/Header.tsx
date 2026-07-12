"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { mockUser, mockClients } from "@/lib/mock-data";
import {
  Search, Bell, Plus, Sun, Moon, ChevronDown,
  Settings, LogOut, User, Sparkles, X, Terminal, ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const { theme, toggleTheme } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Commands and rapid actions for power users
  const commandActions = [
    { label: "Créer une publication", desc: "Planifier ou diffuser un post", shortcut: "P", action: () => router.push("/publications") },
    { label: "Générer du contenu (Texte IA)", desc: "Lancer le chat de rédaction intelligent", shortcut: "T", action: () => router.push("/contenu-ia") },
    { label: "Générer des images (Visuels IA)", desc: "Créer 10 illustrations de marque par IA", shortcut: "I", action: () => router.push("/images-ia") },
    { label: "Générer des vidéos (Reels IA)", desc: "Créer 4 clips animés uniques", shortcut: "V", action: () => router.push("/videos-ia") },
    { label: "Créer une nouvelle facture", desc: "Ouvrir l'outil de facturation client", shortcut: "F", action: () => router.push("/facturation") },
    { label: "Basculer le thème (Sombre/Clair)", desc: "Inverser l'ambiance visuelle du SaaS", shortcut: "D", action: () => toggleTheme() },
    { label: "Accéder aux paramètres de profil", desc: "Gérer vos préférences et intégrations", shortcut: "S", action: () => router.push("/parametres") },
    { label: "Consulter le calendrier éditorial", desc: "Voir le planning de diffusion", shortcut: "C", action: () => router.push("/calendrier") },
  ];

  // Dynamic Client shortcuts injected from mock data
  const clientCommands = mockClients.map(c => ({
    label: `Ouvrir l'espace client : ${c.name}`,
    desc: `Voir la fiche de ${c.name} (${c.sector})`,
    shortcut: "↵",
    action: () => router.push(`/clients/${c.id}`)
  }));

  const allCommands = [...commandActions, ...clientCommands];

  const filtered = allCommands.filter((a) =>
    a.label.toLowerCase().includes(searchVal.toLowerCase()) ||
    a.desc.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation within the Command Palette
  useEffect(() => {
    if (!searchOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          setSearchOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [searchOpen, selectedIndex, filtered]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchVal]);

  return (
    <header
      style={{
        height: 60,
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 12,
        flexShrink: 0,
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* ⌘K Trigger Button */}
      <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
        <button
          onClick={() => setSearchOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 12px",
            borderRadius: 8,
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: 13,
            width: "100%",
            transition: "all 0.15s",
            textAlign: "left",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "var(--border-strong)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "var(--border)"; }}
        >
          <Search size={14} />
          <span>Palette de commande...</span>
          <kbd style={{ marginLeft: "auto", fontSize: 10, background: "var(--bg-muted)", padding: "1px 5px", borderRadius: 4, border: "1px solid var(--border)" }}>⌘K</kbd>
        </button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Notifications */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "transparent",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
            position: "relative",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.background = "var(--bg-subtle)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.background = "transparent"; }}
        >
          <Bell size={16} />
          <div
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#EF4444",
              border: "2px solid var(--bg)",
            }}
          />
        </button>
        
        {notifOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              width: 320,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Notifications</span>
              <button onClick={() => setNotifOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={14} /></button>
            </div>
            {[
              { title: "Post publié avec succès", desc: "Client Restauration — Instagram", time: "Il y a 12 min", dot: "#10B981" },
              { title: "Alerte engagement", desc: "Client Sport & Santé en baisse de 12%", time: "Il y a 2h", dot: "#F59E0B" },
              { title: "Rapport prêt", desc: "Client Cosmétiques — Juin 2026", time: "Il y a 4h", dot: "#2563EB" },
            ].map((n, i) => (
              <div key={i} style={{ padding: "12px 16px", display: "flex", gap: 10, borderBottom: i < 2 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.dot, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{n.desc}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Create Link */}
      <Link href="/publications">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            background: "var(--primary)",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            transition: "all 0.15s",
            boxShadow: "0 1px 2px rgba(37,99,235,0.3)",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.background = "var(--primary-hover)"; (e.currentTarget).style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.background = "var(--primary)"; (e.currentTarget).style.transform = "translateY(0)"; }}
        >
          <Plus size={15} />
          Créer
        </button>
      </Link>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "transparent",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--text-secondary)",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget).style.background = "var(--bg-subtle)"; }}
        onMouseLeave={(e) => { (e.currentTarget).style.background = "transparent"; }}
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 10px 5px 5px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid var(--border)",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.background = "var(--bg-subtle)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.background = "transparent"; }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "white",
            }}
          >
            {mockUser.avatar}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>{mockUser.name.split(" ")[0]}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{mockUser.plan}</div>
          </div>
          <ChevronDown size={13} color="var(--text-muted)" />
        </button>

        {profileOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              width: 220,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{mockUser.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{mockUser.email}</div>
              <div style={{ marginTop: 6, display: "inline-flex", padding: "2px 8px", borderRadius: 99, background: "linear-gradient(135deg, #EFF6FF, #EDE9FE)", color: "#2563EB", fontSize: 11, fontWeight: 600 }}>
                ✦ Plan Pro
              </div>
            </div>
            {[
              { icon: User, label: "Mon profil", href: "/parametres" },
              { icon: Settings, label: "Paramètres", href: "/parametres" },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", color: "var(--text-secondary)", fontSize: 13 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <item.icon size={14} />
                  {item.label}
                </div>
              </Link>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", color: "#EF4444", fontSize: 13 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FEF2F2"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <LogOut size={14} />
                Déconnexion
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── POWER USER COMMAND PALETTE MODAL ── */}
      {searchOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            onClick={() => setSearchOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(15,23,42,0.15)", backdropFilter: "blur(4px)",
              zIndex: 999
            }}
          />
          
          {/* Palette Box */}
          <div
            style={{
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 580,
              background: "var(--bg)",
              borderRadius: 14,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Search Input Bar */}
            <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--border)", gap: 12 }}>
              <Terminal size={16} color="var(--primary)" />
              <input
                autoFocus
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Tapez une commande ou cherchez un client (ex: Stripe, Créer...)"
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: 13.5,
                  background: "transparent", color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)"
                }}
              />
              <button 
                onClick={() => setSearchOpen(false)} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* List of actions / commands */}
            <div style={{ padding: "8px 0", maxHeight: 340, overflowY: "auto" }}>
              <div style={{ padding: "6px 18px 4px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Actions rapides & Raccourcis
              </div>
              
              {filtered.length === 0 ? (
                <div style={{ padding: "32px 18px", textAlign: "center", fontSize: 12, color: "var(--text-secondary)" }}>
                  Aucune commande ne correspond à votre recherche
                </div>
              ) : (
                filtered.map((item, i) => {
                  const active = selectedIndex === i;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        item.action();
                        setSearchOpen(false);
                      }}
                      style={{
                        padding: "10px 18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        background: active ? "var(--bg-subtle)" : "transparent",
                        transition: "all 0.1s ease",
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <Terminal size={14} style={{ color: active ? "var(--primary)" : "var(--text-muted)", flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: active ? "var(--primary)" : "var(--text-primary)" }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
                        </div>
                      </div>
                      
                      {/* Keyboard shortcut Badge */}
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
                        background: active ? "var(--primary)" : "var(--bg-muted)",
                        color: active ? "white" : "var(--text-muted)",
                        fontFamily: "var(--font-sans)",
                        display: "flex", alignItems: "center", gap: 4
                      }}>
                        {active ? <ArrowRight size={10} /> : null}
                        {item.shortcut}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div style={{
              padding: "10px 18px", borderTop: "1px solid var(--border)",
              fontSize: 10.5, color: "var(--text-muted)", display: "flex", gap: 14,
              background: "var(--bg-subtle)"
            }}>
              <span>↑↓ Naviguer</span>
              <span>↵ Valider</span>
              <span>Esc Fermer</span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
