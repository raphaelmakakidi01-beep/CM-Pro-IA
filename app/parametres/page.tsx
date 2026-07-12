"use client";

import { useState, useEffect } from "react";
import { Settings, User, Bell, Lock, Globe, Palette, CreditCard, Plug, ShieldCheck, Check, Sparkles, RefreshCw, LogOut } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { InstagramIcon, FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, OpenAIIcon, AnthropicIcon, GoogleDriveIcon, DropboxIcon } from "@/components/icons/SocialIcons";

const settingsSections = [
  { id: "profil", label: "Profil", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Intégrations", icon: Plug }, // Fixed ID (removed accent)
  { id: "securite", label: "Sécurité", icon: Lock },
  { id: "apparence", label: "Apparence", icon: Palette },
  { id: "langue", label: "Langue & Région", icon: Globe },
  { id: "abonnement", label: "Abonnement", icon: CreditCard },
];

interface Integration {
  id: string;
  name: string;
  category: "social" | "storage" | "ai" | "messaging";
  description: string;
  connected: boolean;
  logo: React.ReactNode;
  color: string;
  requiresKey?: boolean;
  apiKeyPlaceholder?: string;
}

export default function ParametresPage() {
  const [active, setActive] = useState("profil");
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [integrationsCategory, setIntegrationsCategory] = useState<"all" | "social" | "ai" | "storage">("all");

  // State management to simulate enabling/disabling integrations live
  const [integrations, setIntegrations] = useState<Integration[]>([
    // Social
    { id: "instagram", name: "Instagram Business", category: "social", description: "Publiez vos photos, carrousels et Reels automatiquement.", connected: true, color: "#E1306C", logo: <InstagramIcon size={20} /> },
    { id: "facebook", name: "Facebook Pages", category: "social", description: "Gérez vos pages de marque et planifiez vos publications.", connected: true, color: "#1877F2", logo: <FacebookIcon size={20} /> },
    { id: "linkedin", name: "LinkedIn Profile", category: "social", description: "Partagez des articles, carrousels PDF et posts professionnels.", connected: false, color: "#0A66C2", logo: <LinkedinIcon size={20} /> },
    { id: "twitter", name: "Twitter / X", category: "social", description: "Planifiez vos tweets isolés et vos threads informatifs.", connected: false, color: "#000000", logo: <TwitterIcon size={20} /> },
    { id: "youtube", name: "YouTube Channels", category: "social", description: "Téléversez vos Shorts et vidéos longues directement.", connected: false, color: "#FF0000", logo: <YoutubeIcon size={20} /> },
    // AI
    { id: "gemini", name: "Google Gemini API", category: "ai", description: "Génération de scripts de vidéos, scénarios de Reels et légendes.", connected: true, color: "#1E293B", requiresKey: true, apiKeyPlaceholder: "AIzaSy••••••••••••••••", logo: <Sparkles size={20} color="#2563EB" /> },
    { id: "openai", name: "OpenAI API", category: "ai", description: "Génération de légendes et d'idées avec GPT-4o.", connected: true, color: "#10a37f", requiresKey: true, apiKeyPlaceholder: "sk-proj-••••••••••••••••", logo: <OpenAIIcon size={20} /> },
    { id: "anthropic", name: "Anthropic Claude", category: "ai", description: "Relecture et ajustement de tonalité rédactionnelle premium.", connected: false, color: "#D97706", requiresKey: true, apiKeyPlaceholder: "sk-ant-••••••••••••••••", logo: <AnthropicIcon size={20} /> },
    // Storage / Tools
    { id: "gdrive", name: "Google Drive", category: "storage", description: "Importez vos médias (images, vidéos) directement depuis vos dossiers.", connected: false, color: "#34A853", logo: <GoogleDriveIcon size={20} /> },
    { id: "dropbox", name: "Dropbox Cloud", category: "storage", description: "Accédez à vos visuels de marque et livrables créatifs.", connected: false, color: "#0061FF", logo: <DropboxIcon size={20} /> },
  ]);

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    openai: "sk-proj-saved_key_12345",
    anthropic: "",
    gemini: ""
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load API keys from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cm_ia_api_keys");
    if (saved) {
      try {
        setApiKeys(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading keys", e);
      }
    }
  }, []);

  const saveKey = (providerName: string) => {
    setToastMessage(`Clé API ${providerName} sauvegardée avec succès !`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, connected: !item.connected };
      }
      return item;
    }));
  };

  const handleApiKeyChange = (id: string, value: string) => {
    const newKeys = { ...apiKeys, [id]: value };
    setApiKeys(newKeys);
    localStorage.setItem("cm_ia_api_keys", JSON.stringify(newKeys));
  };

  return (
    <div style={{ maxWidth: 1050, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Paramètres</h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Gérez votre compte et vos préférences</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
        {/* Navigation Sidebar */}
        <div className="card" style={{ padding: "8px", height: "fit-content", display: "flex", flexDirection: "column", gap: 2 }}>
          {settingsSections.map((s) => {
            const isSelected = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                  borderRadius: 8, border: "none", fontSize: 13, fontWeight: isSelected ? 600 : 400,
                  background: isSelected ? "var(--primary)" : "transparent",
                  color: isSelected ? "white" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.15s", textAlign: "left",
                }}
              >
                <s.icon size={15} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="card" style={{ padding: "24px 28px", minHeight: 480 }}>
          
          {/* SECTION 1: PROFIL */}
          {active === "profil" && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Mon profil</h3>
              <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "white" }}>
                  {mockUser.avatar}
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
                  <button className="btn btn-secondary" style={{ fontSize: 12, padding: "7px 14px" }}>Changer l'avatar</button>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>JPG, PNG, GIF · Max 2 MB</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Nom complet", value: name, setter: setName },
                  { label: "Adresse email", value: email, setter: setEmail },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>{field.label}</label>
                    <input className="input" value={field.value} onChange={(e) => field.setter(e.target.value)} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Rôle</label>
                  <input className="input" value={mockUser.role} readOnly style={{ opacity: 0.7 }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button className="btn btn-primary" style={{ padding: "9px 20px" }}>Enregistrer</button>
                <button className="btn btn-secondary" style={{ padding: "9px 16px" }}>Annuler</button>
              </div>
            </div>
          )}

          {/* SECTION 2: NOTIFICATIONS */}
          {active === "notifications" && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Notifications</h3>
              {[
                { label: "Publications publiées", desc: "Recevoir une notification à chaque publication réussie" },
                { label: "Alertes d'engagement", desc: "Être alerté quand l'engagement d'un client baisse" },
                { label: "Rapports prêts", desc: "Notification quand un rapport est généré" },
                { label: "Messages de l'équipe", desc: "Nouvelles conversations et mentions" },
                { label: "Factures dues", desc: "Rappels avant échéance" },
              ].map((notif, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{notif.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{notif.desc}</div>
                  </div>
                  <button
                    style={{
                      width: 44, height: 24, borderRadius: 99, border: "none",
                      background: i < 3 ? "var(--primary)" : "var(--bg-muted)",
                      cursor: "pointer", position: "relative", transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 2, left: i < 3 ? 22 : 2, width: 20, height: 20,
                      borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s",
                    }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 3: INTEGRATIONS (NEW) */}
          {active === "integrations" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Intégrations & Connexions</h3>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Connectez vos réseaux et vos outils IA préférés</p>
                </div>
              </div>

              {/* Sub categories */}
              <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "var(--bg-muted)", padding: 3, borderRadius: 8, width: "fit-content" }}>
                {[
                  { id: "all", label: "Toutes" },
                  { id: "social", label: "Réseaux Sociaux" },
                  { id: "ai", label: "Intelligence Artificielle" },
                  { id: "storage", label: "Stockage" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setIntegrationsCategory(cat.id as any)}
                    style={{
                      padding: "5px 12px", borderRadius: 6, border: "none",
                      fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                      background: integrationsCategory === cat.id ? "var(--bg)" : "transparent",
                      color: integrationsCategory === cat.id ? "var(--text-primary)" : "var(--text-secondary)",
                      boxShadow: integrationsCategory === cat.id ? "var(--shadow-sm)" : "none"
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Integrations Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {integrations
                  .filter(item => integrationsCategory === "all" || item.category === integrationsCategory)
                  .map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "16px",
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "var(--bg)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div>
                        {/* Service Header */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: 8,
                              background: item.color + "12",
                              color: item.color,
                              display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                              {item.logo}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                          </div>

                          {/* Connection indicator */}
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                            background: item.connected ? "#ECFDF5" : "#F1F5F9",
                            color: item.connected ? "#059669" : "#64748B"
                          }}>
                            {item.connected ? <Check size={10} /> : null}
                            {item.connected ? "Actif" : "Inactif"}
                          </span>
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                          {item.description}
                        </p>
                      </div>

                      {/* API Key field if requires key */}
                      {item.requiresKey && item.connected && (
                        <div style={{ marginTop: 2 }}>
                          <label style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Clé API</label>
                          <input
                            type="password"
                            className="input"
                            style={{ height: 28, fontSize: 11, padding: "0 8px" }}
                            placeholder={item.apiKeyPlaceholder}
                            value={apiKeys[item.id] || ""}
                            onChange={(e) => handleApiKeyChange(item.id, e.target.value)}
                          />
                        </div>
                      )}

                      {/* Buttons */}
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        {item.connected ? (
                          <>
                            <button
                              onClick={() => toggleConnection(item.id)}
                              className="btn btn-secondary"
                              style={{ flex: 1, height: 28, padding: 0, fontSize: 11, gap: 5, color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }}
                            >
                              <LogOut size={12} />
                              Déconnecter
                            </button>
                             {item.requiresKey && (
                               <button
                                 className="btn btn-secondary"
                                 style={{ flex: 1, height: 28, padding: 0, fontSize: 11, gap: 5 }}
                                 onClick={() => saveKey(item.name)}
                               >
                                 Sauvegarder
                               </button>
                             )}
                          </>
                        ) : (
                          <button
                            onClick={() => toggleConnection(item.id)}
                            className="btn btn-primary"
                            style={{ width: "100%", height: 28, padding: 0, fontSize: 11, gap: 5 }}
                          >
                            <Plug size={12} />
                            Activer la connexion
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* FALLBACK FOR SECTIONS NOT IMPLEMENTED */}
          {active !== "profil" && active !== "notifications" && active !== "integrations" && (() => {
            const sectionObj = settingsSections.find(s => s.id === active);
            const SectionIcon = sectionObj ? sectionObj.icon : Settings;
            return (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ display: "inline-flex", padding: 12, borderRadius: 12, background: "var(--bg-muted)", color: "var(--primary)", marginBottom: 16 }}>
                  <SectionIcon size={28} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{sectionObj?.label}</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Section disponible dans la version complète.</p>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Styled Professional Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#0F172A",
          color: "white",
          padding: "12px 18px",
          borderRadius: 12,
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 10000,
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "fadeIn 0.25s ease-out",
          fontSize: 13,
          fontWeight: 600
        }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <Check size={11} color="white" strokeWidth={3} />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
