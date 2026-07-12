"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AIAlerts } from "@/components/dashboard/AIAlerts";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { mockStats, mockEngagementData } from "@/lib/mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";
import {
  Users, Send, TrendingUp, Radio,
  Wallet, Receipt, CheckSquare, Eye,
  Check, MessageSquare, Phone, Laptop, X, Sparkles,
  Heart, MessageCircle, Share2, Save, RefreshCw, Pencil, Upload,
} from "lucide-react";

// Recharts est lourd (~500 KB) — on le charge en différé
const AreaChartWidget = dynamic(() => import("@/components/dashboard/AreaChartWidget"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
      <div style={{ width: 32, height: 32, border: "2px solid var(--primary)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
    </div>
  ),
});

// Group 1: Social Media Performance
const socialStats = [
  {
    label: "Portée totale",
    value: formatNumber(mockStats.totalReach),
    change: 18,
    changeLabel: "30 derniers jours",
    icon: <Radio size={18} />,
    gradient: "linear-gradient(135deg, #F0F7FF 0%, #E0F2FE 100%)",
    iconColor: "#2563EB",
  },
  {
    label: "Engagement moyen",
    value: `${mockStats.avgEngagement}%`,
    change: 5,
    changeLabel: "vs. mois dernier",
    icon: <TrendingUp size={18} />,
    gradient: "linear-gradient(135deg, #FFFDF0 0%, #FEF8D3 100%)",
    iconColor: "#F59E0B",
  },
  {
    label: "Abonnés totaux",
    value: formatNumber(mockStats.totalFollowers),
    change: 6,
    changeLabel: "Tous clients confondus",
    icon: <Eye size={18} />,
    gradient: "linear-gradient(135deg, #FAF8FF 0%, #F3E8FF 100%)",
    iconColor: "#7C3AED",
  },
  {
    label: "Posts publiés",
    value: mockStats.publishedPostsMonth,
    change: 23,
    changeLabel: "Ce mois",
    icon: <Send size={18} />,
    gradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    iconColor: "#10B981",
  },
];

// Group 2: Business & Operations Management
const businessStats = [
  {
    label: "Clients actifs",
    value: mockStats.activeClients,
    change: 12,
    changeLabel: "2 nouveaux ce mois",
    icon: <Users size={18} />,
    gradient: "linear-gradient(135deg, #F0F7FF 0%, #E0F2FE 100%)",
    iconColor: "#2563EB",
  },
  {
    label: "Revenus du mois",
    value: formatCurrency(mockStats.monthlyRevenue),
    change: 4,
    changeLabel: "vs. juin",
    icon: <Wallet size={18} />,
    gradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    iconColor: "#10B981",
  },
  {
    label: "Factures en attente",
    value: mockStats.pendingInvoices,
    change: -1, // Decrease of outstanding bills is positive (green)
    changeLabel: "À relancer",
    icon: <Receipt size={18} />,
    gradient: "linear-gradient(135deg, #FFF5F5 0%, #FED7D7 100%)",
    iconColor: "#EF4444",
    invertTrendColor: true,
  },
  {
    label: "Tâches ouvertes",
    value: mockStats.openTasks,
    change: -3, // Decrease of tasks list size is positive (green)
    changeLabel: "3 urgentes",
    icon: <CheckSquare size={18} />,
    gradient: "linear-gradient(135deg, #FFFDF0 0%, #FEF8D3 100%)",
    iconColor: "#F59E0B",
    invertTrendColor: true,
  },
];

const initialReviewPosts = [
  {
    id: "rev-1",
    clientId: "c1",
    clientName: "Client Restauration",
    clientLogo: "CR",
    clientColor: "#F59E0B",
    network: "instagram",
    postCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&fit=crop",
    text: "Découvrez notre nouveau menu signature d'été, préparé avec passion par notre chef. Une explosion de saveurs locales vous attend ✨ #gastronomie #paris",
    likes: 142,
    comments: 18,
  },
  {
    id: "rev-2",
    clientId: "c2",
    clientName: "Client Technologie",
    clientLogo: "CT",
    clientColor: "#2563EB",
    network: "linkedin",
    postCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&fit=crop",
    text: "L'intelligence artificielle transforme en profondeur la gestion des réseaux sociaux. Notre dernier livre blanc vous livre 10 astuces actionnables pour optimiser votre flux de production. 📈 #SaaS #AI",
    likes: 54,
    comments: 7,
  },
  {
    id: "rev-3",
    clientId: "c3",
    clientName: "Client E-commerce",
    clientLogo: "CE",
    clientColor: "#7C3AED",
    network: "instagram",
    postCount: 1,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&fit=crop",
    text: "La capsule Flore & Co est enfin disponible. Matières éco-responsables et coupes intemporelles pour un été tout en légèreté. 🌿 #slowfashion #summer",
    likes: 312,
    comments: 24,
  }
];

export default function DashboardPage() {
  const [reviewPosts, setReviewPosts] = useState(initialReviewPosts);
  const [proofingPost, setProofingPost] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");
  const [editedText, setEditedText] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAIWorking, setIsAIWorking] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  const [normalizationMetadata, setNormalizationMetadata] = useState<any | null>(null);
  const [isHoveredImage, setIsHoveredImage] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    setOriginalImageUrl(null);
    setNormalizationMetadata(null);
    setSliderPosition(50);
  }, [proofingPost?.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !proofingPost) return;

    const targetWidth = proofingPost.network === "instagram" ? 1080 : 1200;
    const targetHeight = proofingPost.network === "instagram" ? 1080 : 630;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawUrl = event.target?.result as string;
      setOriginalImageUrl(rawUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imgRatio = img.width / img.height;
          const targetRatio = targetWidth / targetHeight;
          let drawWidth = targetWidth;
          let drawHeight = targetHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > targetRatio) {
            drawWidth = img.height * targetRatio;
            offsetX = (img.width - drawWidth) / 2;
            ctx.drawImage(img, offsetX, 0, drawWidth, img.height, 0, 0, targetWidth, targetHeight);
          } else {
            drawHeight = img.width / targetRatio;
            offsetY = (img.height - drawHeight) / 2;
            ctx.drawImage(img, 0, offsetY, img.width, drawHeight, 0, 0, targetWidth, targetHeight);
          }

          const base64Data = canvas.toDataURL("image/jpeg", 0.8);
          const sizeBytes = Math.round((base64Data.length * 3) / 4);
          const sizeKb = Math.round(sizeBytes / 1024);

          setProofingPost((prev: any) => ({ ...prev, imageUrl: base64Data }));
          setNormalizationMetadata({
            width: targetWidth,
            height: targetHeight,
            sizeKb
          });
        }
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  };

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Tableau de bord</h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          Bonjour Sophie — {today}
        </p>
      </div>

      {/* ── Section 1: Performance Réseaux ── */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Performances Réseaux Sociaux
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {socialStats.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* ── Section 2: Business & Opérations ── */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Gestion Opérationnelle & Business
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {businessStats.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* ── Section 2.5: File d'attente d'approbation (Human-in-the-loop) ── */}
      {reviewPosts.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
            Publications prêtes pour validation
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {reviewPosts.map((post) => (
              <div key={post.id} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: post.clientColor + "18",
                      border: `1.5px solid ${post.clientColor}30`,
                      color: post.clientColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 800
                    }}>
                      {post.clientLogo}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{post.clientName}</div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "capitalize" }}>{post.network}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "#ECFDF5", color: "#10B981" }}>
                    {post.postCount} posts prêts
                  </span>
                </div>

                {/* Thumbnail & Copy */}
                <div style={{ display: "flex", gap: 10, background: "var(--bg-subtle)", padding: 8, borderRadius: 8, border: "1px solid var(--border)" }}>
                  <img src={post.imageUrl} style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} alt="Miniature" />
                  <div style={{
                    fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                  }}>
                    {post.text}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 4 }}>
                  <button
                    onClick={() => {
                      setProofingPost(post);
                      setEditedText(post.text);
                      setAiPrompt("");
                      setNormalizationMetadata(null);
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "7px 0", fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <Eye size={13} />
                    <span>Visualiser & Valider</span>
                  </button>
                  <button
                    onClick={() => {
                      setProofingPost(post);
                      setEditedText(post.text);
                      setAiPrompt("");
                      setNormalizationMetadata(null);
                    }}
                    className="btn btn-secondary"
                    style={{ padding: 7 }}
                    title="Retravailler"
                  >
                    <Pencil size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts + right column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
        <AreaChartWidget data={mockEngagementData} />
        <AIAlerts />
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <TodaySchedule />
        <ActivityFeed />
      </div>
      {/* ── MOCKUP PROOFING MODAL ── */}
      {proofingPost && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => { if (!isAIWorking) setProofingPost(null); }}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 200 }}
          />

          {/* Modal Container */}
          <div style={{
            position: "fixed",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%", maxWidth: 880,
            maxHeight: "90vh",
            background: "var(--bg)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            zIndex: 201,
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            animation: "scaleIn 0.15s ease-out"
          }}>
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Human-in-the-Loop</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "2px 0 0 0" }}>
                  Prévisualisation & Validation : {proofingPost.clientName}
                </h3>
              </div>
              <button
                disabled={isAIWorking}
                onClick={() => setProofingPost(null)}
                style={{ background: "none", border: "none", cursor: isAIWorking ? "not-allowed" : "pointer", color: "var(--text-muted)", display: "flex" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body: Columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, overflow: "hidden" }}>
              
              {/* Left Column: Social Feed Mockup */}
              <div style={{ background: "var(--bg-subtle)", padding: 20, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", borderRight: "1px solid var(--border)", alignItems: "center", justifyContent: "center" }}>
                
                {/* View switcher */}
                <div style={{ display: "flex", gap: 6, background: "var(--bg)", padding: 4, borderRadius: 8, border: "1px solid var(--border)", flexShrink: 0 }}>
                  <button
                    onClick={() => setViewMode("mobile")}
                    style={{
                      padding: "6px 12px", borderRadius: 6, border: "none",
                      background: viewMode === "mobile" ? "var(--bg-muted)" : "transparent",
                      color: viewMode === "mobile" ? "var(--text-primary)" : "var(--text-secondary)",
                      fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                    }}
                  >
                    <Phone size={12} /> Mobile
                  </button>
                  <button
                    onClick={() => setViewMode("desktop")}
                    style={{
                      padding: "6px 12px", borderRadius: 6, border: "none",
                      background: viewMode === "desktop" ? "var(--bg-muted)" : "transparent",
                      color: viewMode === "desktop" ? "var(--text-primary)" : "var(--text-secondary)",
                      fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4
                    }}
                  >
                    <Laptop size={12} /> Desktop
                  </button>
                </div>

                {/* Mockup wrapper */}
                <div style={viewMode === "mobile" ? {
                  width: 320, height: 440, border: "10px solid #1E293B", borderRadius: 32,
                  background: "var(--bg)", boxShadow: "var(--shadow-lg)", overflowY: "auto", position: "relative",
                  display: "flex", flexDirection: "column"
                } : {
                  width: "100%", maxWidth: 440, height: 440, border: "1px solid var(--border)", borderRadius: 12,
                  background: "var(--bg)", boxShadow: "var(--shadow)", overflowY: "auto", display: "flex", flexDirection: "column"
                }}>
                  {/* Mockup Social Post */}
                  <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* User profile */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", background: proofingPost.clientColor + "15",
                        color: proofingPost.clientColor, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, border: `1.5px solid ${proofingPost.clientColor}30`
                      }}>
                        {proofingPost.clientLogo}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                          {proofingPost.clientName}
                          <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 400 }}>· 2h</span>
                        </div>
                        <div style={{ fontSize: 9, color: "var(--text-muted)" }}>Sponsorisé</div>
                      </div>
                    </div>

                    {/* Copy */}
                    <div style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                      {editedText}
                    </div>

                    {/* Image visual with Hover Overlay or Before/After Slider */}
                    <div
                      onMouseEnter={() => setIsHoveredImage(true)}
                      onMouseLeave={() => setIsHoveredImage(false)}
                      style={{
                        borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)",
                        background: "var(--bg-muted)", height: 200, position: "relative",
                        cursor: "pointer"
                      }}
                    >
                      {originalImageUrl ? (
                        /* Before/After Split Slider */
                        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", userSelect: "none" }}>
                          {/* Bottom/Original image (Avant) */}
                          <img src={originalImageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avant" />
                          <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(15,23,42,0.75)", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, zIndex: 4 }}>
                            Avant (Brut)
                          </div>

                          {/* Top/Normalized image (Après) - clipped by sliderPosition */}
                          <div style={{
                            position: "absolute", inset: 0,
                            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                          }}>
                            <img src={proofingPost.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Après" />
                            <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(16, 185, 129, 0.95)", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, zIndex: 4 }}>
                              Après (Normalisé)
                            </div>
                          </div>

                          {/* Slider line separator */}
                          <div style={{
                            position: "absolute", top: 0, bottom: 0, left: `${sliderPosition}%`,
                            width: 2, background: "white", cursor: "ew-resize", zIndex: 5,
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <div style={{
                              width: 18, height: 18, borderRadius: "50%", background: "white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.3)", display: "flex", alignItems: "center",
                              justifyContent: "center", fontSize: 9, color: "var(--text-secondary)", fontWeight: 700
                            }}>
                              ↔
                            </div>
                          </div>

                          {/* Invisible input range covering the whole container to make it interactive and slide! */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderPosition}
                            onChange={(e) => setSliderPosition(Number(e.target.value))}
                            style={{
                              position: "absolute", inset: 0, width: "100%", height: "100%",
                              opacity: 0, cursor: "ew-resize", zIndex: 6, margin: 0
                            }}
                          />
                        </div>
                      ) : (
                        /* Normal image display */
                        <img src={proofingPost.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Post visual" />
                      )}
                      
                      {/* Hover Overlay */}
                      {isHoveredImage && (
                        <div
                          onClick={() => document.getElementById("proofing-image-upload")?.click()}
                          style={{
                            position: "absolute", inset: 0, background: "rgba(15, 23, 42, 0.5)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 15
                          }}
                        >
                          <span style={{
                            background: "var(--bg)", color: "var(--text-primary)",
                            fontSize: 11, fontWeight: 700, padding: "8px 14px",
                            borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            display: "flex", alignItems: "center", gap: 6
                          }}>
                            <Upload size={13} /> Remplacer l'image
                          </span>
                        </div>
                      )}

                      {/* Hidden Input file */}
                      <input
                        type="file"
                        id="proofing-image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />

                      {/* Normalization Badge */}
                      {normalizationMetadata && (
                        <div style={{
                          position: "absolute", bottom: 8, left: 8, right: 8,
                          background: "rgba(16, 185, 129, 0.95)", backdropFilter: "blur(2px)",
                          color: "white", padding: "4px 8px", borderRadius: 6,
                          fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", gap: 4,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 10
                        }}>
                          <Sparkles size={11} />
                          <span>Image normalisée ({normalizationMetadata.width}x{normalizationMetadata.height}, ~{normalizationMetadata.sizeKb} Ko)</span>
                        </div>
                      )}
                    </div>

                    {/* Social Stats & Likes */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 10, fontSize: 10, color: "var(--text-muted)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#EF4444"}>
                        <Heart size={12} /> {proofingPost.likes} Likes
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MessageCircle size={12} /> {proofingPost.comments} Comments
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Share2 size={12} /> Share
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Editor & Controls */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                
                {/* Manual Text Editor */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                    Éditer le texte rédigé par le Copywriter IA
                  </label>
                  <textarea
                    value={editedText}
                    onChange={e => setEditedText(e.target.value)}
                    rows={6}
                    style={{
                      width: "100%", padding: 12, borderRadius: 8, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", color: "var(--text-primary)", fontSize: 13, lineHeight: 1.6,
                      outline: "none", fontFamily: "var(--font-sans)", resize: "none"
                    }}
                  />
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>
                    Modifiez le texte à la main pour corriger une faute ou adapter le ton immédiatement.
                  </div>
                </div>

                {/* AI Rework Section */}
                <div style={{ background: "var(--bg-subtle)", padding: 14, borderRadius: 10, border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}>
                    <Sparkles size={14} color="var(--primary)" />
                    Instructions de correction pour l'IA
                  </label>
                  
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      disabled={isAIWorking}
                      value={aiPrompt}
                      onChange={e => setAiPrompt(e.target.value)}
                      placeholder="ex: Rends le ton plus fun et décalé..."
                      style={{
                        flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)",
                        background: "var(--bg)", color: "var(--text-primary)", fontSize: 12, outline: "none",
                        fontFamily: "var(--font-sans)"
                      }}
                    />
                    <button
                      type="button"
                      disabled={isAIWorking || !aiPrompt.trim()}
                      onClick={() => {
                        setIsAIWorking(true);
                        setTimeout(() => {
                          setIsAIWorking(false);
                          setEditedText(prev => prev + "\n\n🚀 [Régénéré par l'IA] : Profitez de notre offre exclusive d'été ! Des saveurs authentiques, un cadre idyllique... Cliquez sur le lien pour réserver votre table. 🥂✨ #summerlife");
                          setAiPrompt("");
                        }, 3000);
                      }}
                      className="btn btn-secondary"
                      style={{ padding: "8px 14px", fontSize: 12, gap: 5, whiteSpace: "nowrap" }}
                    >
                      {isAIWorking ? (
                        <>
                          <div style={{ width: 12, height: 12, border: "1.5px solid var(--primary)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                          Calcul...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={12} />
                          Renvoyer
                        </>
                      )}
                    </button>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    L'équipe de sous-agents IA adaptera automatiquement le visuel et le texte selon votre brief.
                  </div>
                </div>

                {/* Submit / Approve actions */}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid var(--border)", paddingTop: 18, marginTop: "auto" }}>
                  <button
                    disabled={isAIWorking}
                    type="button"
                    onClick={() => setProofingPost(null)}
                    style={{
                      padding: "10px 18px", borderRadius: 8, border: "1px solid var(--border)",
                      background: "transparent", color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
                      cursor: isAIWorking ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)"
                    }}
                    onMouseEnter={e => { if (!isAIWorking) e.currentTarget.style.background = "var(--bg-subtle)"; }}
                    onMouseLeave={e => { if (!isAIWorking) e.currentTarget.style.background = "transparent"; }}
                  >
                    Fermer
                  </button>
                  <button
                    disabled={isAIWorking}
                    type="button"
                    onClick={() => {
                      setSuccessToast(`Publication approuvée et programmée pour ${proofingPost.clientName} !`);
                      setReviewPosts(prev => prev.filter(p => p.id !== proofingPost.id));
                      setProofingPost(null);
                      setTimeout(() => setSuccessToast(""), 4000);
                    }}
                    style={{
                      padding: "10px 20px", borderRadius: 8, border: "none",
                      background: "#10B981", color: "white", fontSize: 12, fontWeight: 600,
                      cursor: isAIWorking ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                      boxShadow: "0 1px 2px rgba(16, 185, 129, 0.2)", fontFamily: "var(--font-sans)"
                    }}
                    onMouseEnter={e => { if (!isAIWorking) e.currentTarget.style.background = "#059669"; }}
                    onMouseLeave={e => { if (!isAIWorking) e.currentTarget.style.background = "#10B981"; }}
                  >
                    <Check size={14} />
                    Approuver & Programmer
                  </button>
                </div>

              </div>

            </div>
          </div>
        </>
      )}

      {/* ── SUCCESS TOAST BANNER ── */}
      {successToast && (
        <div style={{
          position: "fixed", bottom: 20, right: 20,
          background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
          border: "1px solid #10B981", color: "#065F46",
          padding: "12px 20px", borderRadius: 10,
          fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.2)", zIndex: 9999,
          animation: "slideIn 0.25s ease-out"
        }}>
          <Check size={16} />
          {successToast}
        </div>
      )}
    </div>
  );
}
