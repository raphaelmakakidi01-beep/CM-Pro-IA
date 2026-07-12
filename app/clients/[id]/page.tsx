"use client";
import React, { useState } from "react";
import { mockClients, networkColors } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel, formatNumber, formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, BarChart2, Calendar, FileText, Settings,
  Globe, Image, Send, TrendingUp, Users, Music2,
  Sparkles, Palette, Link2, BookOpen, Upload, Save, Trash2, Check, AlertCircle,
  X, Info,
} from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

const tabs = [
  { id: "overview", label: "Vue générale", icon: Globe },
  { id: "brandkit", label: "Contexte IA & Marque", icon: Sparkles },
  { id: "calendrier", label: "Calendrier", icon: Calendar },
  { id: "contenus", label: "Contenus", icon: FileText },
  { id: "images", label: "Images", icon: Image },
  { id: "publications", label: "Publications", icon: Send },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "rapports", label: "Rapports", icon: TrendingUp },
  { id: "parametres", label: "Paramètres", icon: Settings },
];

const networkIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon size={12} />,
  facebook: <FacebookIcon size={12} />,
  linkedin: <LinkedinIcon size={12} />,
  tiktok: <Music2 size={12} />,
  twitter: <TwitterIcon size={12} />,
  youtube: <YoutubeIcon size={12} />,
};

const mockClientEngagement = [
  { week: "S1", likes: 420, comments: 38, shares: 24 },
  { week: "S2", likes: 380, comments: 44, shares: 31 },
  { week: "S3", likes: 510, comments: 52, shares: 28 },
  { week: "S4", likes: 640, comments: 61, shares: 45 },
];

const mockClientCalendar = [
  { id: "cal-1", date: "Lundi, 10:00", network: "linkedin", type: "Carrousel", status: "scheduled", title: "3 erreurs majeures en Social Media B2B" },
  { id: "cal-2", date: "Mercredi, 14:00", network: "instagram", type: "Story", status: "scheduled", title: "Coulisses de shooting de la marque" },
  { id: "cal-3", date: "Vendredi, 18:00", network: "linkedin", type: "Texte & Image", status: "draft", title: "Annonce du lancement de notre newsletter" },
];

const mockClientDrafts = [
  { id: "dr-1", author: "Alex (Copywriter IA)", network: "linkedin", text: "Saviez-vous que 80% des marques n'adaptent pas leur ton sur LinkedIn ? \nVoici 3 conseils clés pour humaniser votre personal branding B2B sans perdre de crédibilité. \n\n1. Racontez vos coulisses\n2. Parlez comme à vos collègues\n3. Bannissez le jargon marketing. \n\nLequel appliquez-vous déjà ?" },
  { id: "dr-2", author: "Emma (Social Manager)", network: "instagram", text: "Une journée type au cœur de notre atelier ✨ \nDes matières soigneusement sélectionnées, une attention aux moindres détails, et beaucoup de passion. \n\nDécouvrez notre collection complète via le lien en bio. #artisanat #lifestyle" },
];

const mockClientImages = [
  { id: "img-1", url: "https://images.unsplash.com/photo-1542744173-8e08562744ad?w=400&fit=crop", prompt: "clean minimalistic office workspace desk setup, soft warm ambient light --ar 4:5" },
  { id: "img-2", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop", prompt: "professional corporate dynamic illustration about team collaboration --ar 16:9" },
];

const mockClientPublications = [
  { id: "pub-1", date: "Hier, 15:30", network: "linkedin", stats: "142 j'aime · 18 commentaires · 12 partages", title: "Infographie sur l'avenir du travail hybride" },
  { id: "pub-2", date: "08 Juillet, 11:00", network: "instagram", stats: "428 j'aime · 31 commentaires", title: "Lancement de la collection d'été Flore & Co." },
];

const mockClientReports = [
  { id: "rep-1", name: "Rapport de Performance Social Media — Juin 2026", date: "01/07/2026", size: "2.4 Mo" },
  { id: "rep-2", name: "Audit Trimestriel & Recommandations Stratégiques", date: "15/06/2026", size: "5.1 Mo" },
];

export default function ClientWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const client = mockClients.find((c) => c.id === unwrappedParams.id);
  if (!client) return notFound();

  // Brand Kit States (simulated / initialized based on client details)
  const [fonts, setFonts] = useState("Montserrat (Titres), Inter (Corps de texte)");
  const [colors, setColors] = useState([client.logoColor, "#1E293B", "#64748B", "#F8FAFC"]);
  const [colorInput, setColorInput] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(`https://www.${client.name.toLowerCase().replace(/\s/g, "")}.com`);
  const [socialLinks, setSocialLinks] = useState({
    instagram: `https://instagram.com/${client.name.toLowerCase().replace(/\s/g, "")}`,
    facebook: `https://facebook.com/${client.name.toLowerCase().replace(/\s/g, "")}`,
    linkedin: `https://linkedin.com/company/${client.name.toLowerCase().replace(/\s/g, "")}`,
  });
  const [toneOfVoice, setToneOfVoice] = useState(
    `Tutoiement requis pour la communication de ${client.name}. Le ton doit être professionnel, rassurant et pédagogue. Éviter le jargon technique inutile et privilégier l'honnêteté et la clarté. Utiliser 2 à 3 emojis maximum par post.`
  );
  
  // Files simulated states
  const [charterFiles, setCharterFiles] = useState<string[]>([`Charte_Graphique_${client.name.replace(/\s/g, "")}.pdf`]);
  const [logoFiles, setLogoFiles] = useState<string[]>([`logo_${client.name.toLowerCase()}_color.svg`, `logo_${client.name.toLowerCase()}_white.png`]);
  const [docFiles, setDocFiles] = useState<string[]>([`Presentation_${client.name.replace(/\s/g, "")}_2026.pdf`, "Catalogue_Offres.pdf"]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  function handleSaveBrandKit() {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <Link href="/clients" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 12, marginBottom: 16, cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          <ArrowLeft size={13} />
          Retour aux clients
        </div>
      </Link>

      {/* Client Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        marginBottom: 24,
        paddingBottom: 20,
        borderBottom: "1px solid var(--border)",
      }}>
        {/* Left Side: Brand Logo & Information */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
          {client.logo.startsWith("data:image/") || client.logo.startsWith("http") ? (
            <img
              src={client.logo}
              alt="Logo"
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                objectFit: "cover",
                border: "1px solid var(--border)",
                flexShrink: 0
              }}
            />
          ) : (
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: client.logoColor + "22",
              border: `2px solid ${client.logoColor}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
              color: client.logoColor,
              flexShrink: 0,
            }}>
              {client.logo}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{client.name}</h1>
              <span className={getStatusColor(client.status)} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                {getStatusLabel(client.status)}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 8px 0", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              {client.description}
            </p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {client.networks.map((net) => (
                <div key={net} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "3px 8px", borderRadius: 6,
                  background: networkColors[net] + "12",
                  color: networkColors[net], fontSize: 11, fontWeight: 500,
                }}>
                  {networkIcons[net]}
                  <span style={{ textTransform: "capitalize" }}>{net}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: KPIs */}
        <div style={{ display: "flex", gap: 32, textAlign: "right", flexShrink: 0 }}>
          {[
            { label: "Abonnés", value: formatNumber(client.followers) },
            { label: "Engagement", value: `${client.engagement}%` },
            { label: "Posts/mois", value: client.postsThisMonth },
            { label: "Budget", value: formatCurrency(client.monthlyBudget) },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                background: isActive ? "var(--primary)" : "var(--bg)",
                color: isActive ? "white" : "var(--text-secondary)",
                boxShadow: isActive ? "0 1px 3px rgba(37,99,235,0.3)" : "none",
              }}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Engagement chart */}
            <div className="card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Engagement par semaine</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockClientEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", background: "var(--bg)" }} />
                  <Bar dataKey="likes" fill="#2563EB" radius={[4, 4, 0, 0]} name="Likes" />
                  <Bar dataKey="comments" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Commentaires" />
                  <Bar dataKey="shares" fill="#10B981" radius={[4, 4, 0, 0]} name="Partages" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Info card */}
            <div className="card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Informations client</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Secteur", value: client.sector },
                  { label: "Statut", value: getStatusLabel(client.status) },
                  { label: "Budget mensuel", value: formatCurrency(client.monthlyBudget) },
                  { label: "Posts ce mois", value: `${client.postsThisMonth} publications` },
                  { label: "Progression", value: `${client.progress}%` },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next post */}
            <div className="card" style={{ padding: "20px", gridColumn: "1 / -1" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Description</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{client.description}</p>
            </div>
          </div>
        )}

        {activeTab === "brandkit" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Success alert banner */}
            {saveSuccess && (
              <div style={{
                padding: "12px 18px", borderRadius: 10,
                background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
                border: "1px solid #10B981", color: "#065F46",
                fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 12px rgba(16,185,129,0.15)",
                animation: "fadeIn 0.2s ease-out",
              }}>
                <Check size={16} />
                Brand Kit mis à jour ! Le contexte de {client.name} a été synchronisé avec la base RAG de l'Équipe Hybride. 🚀
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Left Column : Identité Visuelle + Doc */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                
                {/* Visual Identity */}
                <div className="card" style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Palette size={16} color="var(--primary)" />
                    Identité Visuelle & Charte Graphique
                  </h3>

                  {/* PDF Upload */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Charte graphique officielle (PDF)
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {charterFiles.map((file, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                          <span style={{ fontSize: 12 }}>📄 {file}</span>
                          <button type="button" onClick={() => setCharterFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setCharterFiles(prev => [...prev, "Charte_BrandKit_V3.pdf"])}
                        style={{
                          padding: "8px", border: "1.5px dashed var(--border)", borderRadius: 6,
                          background: "none", color: "var(--text-muted)", fontSize: 12, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          fontFamily: "var(--font-sans)"
                        }}
                      >
                        <Upload size={13} /> Charger la Charte Graphique
                      </button>
                    </div>
                  </div>

                  {/* Fonts */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Polices d'écriture utilisées
                    </label>
                    <input
                      value={fonts}
                      onChange={e => setFonts(e.target.value)}
                      style={{
                        width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box"
                      }}
                    />
                  </div>

                  {/* Color Palette */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Codes couleurs officiels (HEX)
                    </label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                      {colors.map((c, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                          <span style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                          <span style={{ fontSize: 11, fontFamily: "monospace" }}>{c}</span>
                          <button type="button" onClick={() => setColors(prev => prev.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", padding: 0, color: "var(--text-secondary)", cursor: "pointer", display: "flex" }}>
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        value={colorInput}
                        onChange={e => setColorInput(e.target.value)}
                        placeholder="#FFFFFF"
                        style={{
                          padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 12, outline: "none",
                          fontFamily: "monospace"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (colorInput.startsWith("#") && colorInput.length >= 4) {
                            setColors([...colors, colorInput]);
                            setColorInput("");
                          }
                        }}
                        style={{
                          padding: "6px 12px", borderRadius: 6, border: "none",
                          background: "var(--primary)", color: "white", fontSize: 12, fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>

                {/* Company documentation */}
                <div className="card" style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <BookOpen size={16} color="var(--primary)" />
                    Documentation & Présentation de l'Entreprise
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {docFiles.map((file, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                        <span style={{ fontSize: 12 }}>📄 {file}</span>
                        <button type="button" onClick={() => setDocFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setDocFiles(prev => [...prev, "Manifeste_de_Marque.pdf"])}
                      style={{
                        padding: "8px", border: "1.5px dashed var(--border)", borderRadius: 6,
                        background: "none", color: "var(--text-muted)", fontSize: 12, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        fontFamily: "var(--font-sans)"
                      }}
                    >
                      <Upload size={13} /> Dépôt de document (Catalogues, Pitch PDF)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column : Tone of Voice + Web */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                
                {/* Tone of Voice */}
                <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Sparkles size={16} color="var(--primary)" />
                    Tone of Voice (Ligne éditoriale)
                  </h3>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Instructions pour les Agents IA
                    </label>
                    <textarea
                      value={toneOfVoice}
                      onChange={e => setToneOfVoice(e.target.value)}
                      rows={8}
                      style={{
                        width: "100%", flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, lineHeight: 1.6,
                        outline: "none", fontFamily: "var(--font-sans)", resize: "none", boxSizing: "border-box"
                      }}
                    />
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Info size={12} />
                      Ces règles régissent le style de texte rédigé pour ce client.
                    </div>
                  </div>
                </div>

                {/* Web Ecosystem */}
                <div className="card" style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Link2 size={16} color="var(--primary)" />
                    Écosystème Web & Sources
                  </h3>
                  
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Site web officiel
                    </label>
                    <input
                      value={websiteUrl}
                      onChange={e => setWebsiteUrl(e.target.value)}
                      style={{
                        width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, outline: "none",
                        fontFamily: "var(--font-sans)", boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Instagram</label>
                      <input
                        value={socialLinks.instagram}
                        onChange={e => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                        style={{
                          width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 12, outline: "none",
                          fontFamily: "var(--font-sans)", boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>LinkedIn</label>
                      <input
                        value={socialLinks.linkedin}
                        onChange={e => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                        style={{
                          width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
                          background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 12, outline: "none",
                          fontFamily: "var(--font-sans)", boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Global save button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
              <button
                type="button"
                onClick={handleSaveBrandKit}
                style={{
                  padding: "10px 24px", borderRadius: 8, border: "none",
                  background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  boxShadow: "0 2px 4px rgba(37,99,235,0.2)", fontFamily: "var(--font-sans)"
                }}
              >
                <Save size={14} />
                Enregistrer le Brand Kit
              </button>
            </div>
          </div>
        )}

        {activeTab === "calendrier" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={15} color="var(--primary)" />
              Calendrier Éditorial — {client.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mockClientCalendar.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", justifyItems: "center", padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", gap: 14 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", width: 100 }}>{item.date}</span>
                  
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 8px", borderRadius: 6,
                    background: networkColors[item.network] + "12",
                    color: networkColors[item.network], fontSize: 11, fontWeight: 600
                  }}>
                    {networkIcons[item.network]}
                    <span style={{ textTransform: "capitalize" }}>{item.network}</span>
                  </span>

                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "var(--bg-muted)", color: "var(--text-secondary)", fontWeight: 600 }}>{item.type}</span>
                  
                  <div style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600 }}>
                    {item.title}
                  </div>

                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                    background: item.status === "scheduled" ? "#ECFDF5" : "#FFFBEB",
                    color: item.status === "scheduled" ? "#10B981" : "#F59E0B",
                  }}>
                    {item.status === "scheduled" ? "Programmé" : "Brouillon"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contenus" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {mockClientDrafts.map((item) => (
              <div key={item.id} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>Rédigé par {item.author}</span>
                  </div>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 8px", borderRadius: 6,
                    background: networkColors[item.network] + "12",
                    color: networkColors[item.network], fontSize: 11, fontWeight: 600
                  }}>
                    {networkIcons[item.network]}
                    <span style={{ textTransform: "capitalize" }}>{item.network}</span>
                  </span>
                </div>

                <textarea
                  defaultValue={item.text}
                  rows={6}
                  style={{
                    width: "100%", padding: "10px", borderRadius: 8, border: "1px solid var(--border)",
                    background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, lineHeight: 1.6,
                    outline: "none", fontFamily: "var(--font-sans)", resize: "none"
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--text-muted)" }}>
                  <span>{item.text.length} caractères · ~{Math.round(item.text.length / 5)} mots</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn" style={{ padding: "5px 10px", fontSize: 11 }}>Re-générer</button>
                    <button className="btn btn-primary" style={{ padding: "5px 12px", fontSize: 11 }}>Approuver</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "images" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <Image size={15} color="var(--primary)" />
              Direction Artistique & Visuels IA
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {mockClientImages.map((img) => (
                <div key={img.id} style={{ borderRadius: 10, border: "1px solid var(--border)", overflow: "hidden", background: "var(--bg-subtle)" }}>
                  <img src={img.url} alt="Prompt result" style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Prompt de rendu</div>
                    <code style={{ fontSize: 11, color: "var(--text-primary)", display: "block", background: "var(--bg)", padding: 8, borderRadius: 6, border: "1px solid var(--border)" }}>
                      {img.prompt}
                    </code>
                    <button className="btn btn-secondary" style={{ width: "100%", padding: 6, fontSize: 11, marginTop: 10 }}>Copier le Prompt</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "publications" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <Send size={15} color="var(--primary)" />
              Historique des Publications Actives
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mockClientPublications.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", gap: 14 }}>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 8px", borderRadius: 6,
                    background: networkColors[item.network] + "12",
                    color: networkColors[item.network], fontSize: 11, fontWeight: 600
                  }}>
                    {networkIcons[item.network]}
                    <span style={{ textTransform: "capitalize" }}>{item.network}</span>
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Publié le {item.date}</div>
                  </div>

                  <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                    📈 {item.stats}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <BarChart2 size={15} color="var(--primary)" />
              Statistiques d'Audience Mensuelles
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockClientEngagement}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", background: "var(--bg)" }} />
                <Area type="monotone" dataKey="likes" stroke="#2563EB" fillOpacity={1} fill="url(#colorReach)" name="Portée (Reach)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "rapports" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp size={15} color="var(--primary)" />
              Rapports de Performance Exportés
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mockClientReports.map((rep) => (
                <div key={rep.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{rep.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Généré le {rep.date} · {rep.size}</div>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>Télécharger</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "parametres" && (
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <Settings size={15} color="var(--primary)" />
              Paramètres du Dossier Client
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Validation client requise", desc: "Envoyer un email d'approbation automatique avant publication" },
                { title: "Auto-publication des brouillons", desc: "Publier directement dès que les agents terminent la tâche" },
                { title: "Notifications d'opportunités", desc: "Alerter en cas de tendance chaude repérée par l'IA" },
              ].map((setting, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: idx < 2 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{setting.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{setting.desc}</div>
                  </div>
                  <input type="checkbox" defaultChecked={idx === 0 || idx === 2} style={{ width: 16, height: 16, accentColor: "var(--primary)", cursor: "pointer" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab !== "overview" &&
         activeTab !== "brandkit" &&
         activeTab !== "calendrier" &&
         activeTab !== "contenus" &&
         activeTab !== "images" &&
         activeTab !== "publications" &&
         activeTab !== "analytics" &&
         activeTab !== "rapports" &&
         activeTab !== "parametres" && (() => {
          const tabObj = tabs.find(t => t.id === activeTab);
          const TabIcon = tabObj ? tabObj.icon : Globe;
          return (
            <div className="card" style={{ padding: "60px 40px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", padding: 12, borderRadius: 12, background: "var(--bg-muted)", color: "var(--primary)", marginBottom: 16 }}>
                <TabIcon size={28} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                {tabObj?.label}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto" }}>
                Section disponible dans la version complète. Cliquez sur les liens de navigation pour accéder aux modules globaux.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
