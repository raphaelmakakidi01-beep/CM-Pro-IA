"use client";

import { useState, useEffect } from "react";
import { Video, Sparkles, Play, Download, RefreshCw, Clock, Copy, Check, FileText, AlertCircle, X, AlignLeft } from "lucide-react";

export default function VideosIAPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("Créer un Reel de 5 secondes pour un restaurant gastronomique avec des plats élégants et une ambiance chaleureuse");
  const [duration, setDuration] = useState("5 secondes");
  const [format, setFormat] = useState("Reel (9:16)");
  const [style, setStyle] = useState("Cinématique");
  const [network, setNetwork] = useState("Instagram");
  const [videos, setVideos] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hasGeminiKey, setHasGeminiKey] = useState(true);

  // Check if Gemini API key exists in settings
  useEffect(() => {
    const savedKeys = localStorage.getItem("cm_ia_api_keys");
    if (savedKeys) {
      try {
        const keys = JSON.parse(savedKeys);
        setHasGeminiKey(!!keys.gemini);
      } catch (e) {
        setHasGeminiKey(false);
      }
    } else {
      setHasGeminiKey(false);
    }
  }, []);

  const generate = async () => {
    setGenerating(true);
    setGenerated(false);
    setErrorMsg("");
    setSelectedVideo(null);

    const savedKeys = localStorage.getItem("cm_ia_api_keys");
    let key = "";
    if (savedKeys) {
      try {
        key = JSON.parse(savedKeys).gemini || "";
      } catch (e) {}
    }

    if (!key) {
      setErrorMsg("Clé API Gemini introuvable. Veuillez renseigner votre clé API Gemini dans les Paramètres > Intégrations.");
      setGenerating(false);
      return;
    }

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, duration, format, style, apiKey: key }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la génération.");
      }

      setVideos(data.videos || []);
      setGenerated(true);
      if (data.videos?.length > 0) {
        setSelectedVideo(data.videos[0]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de connexion avec l'API Gemini.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Title */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #EF4444, #F59E0B)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Video size={16} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Générateur Vidéos IA</h1>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Générez des storyboards, des voix-off et des concepts de vidéos professionnelles via Google Gemini.</p>
      </div>

      {/* API Alert Info */}
      {!hasGeminiKey && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          background: "#FFFBEB", border: "1px solid #FEF3C7", borderRadius: 10,
          color: "#D97706", fontSize: 12.5, fontWeight: 500
        }}>
          <AlertCircle size={16} />
          <span>Pour utiliser ce générateur, veuillez configurer votre <strong>Clé API Gemini</strong> dans les <a href="/parametres" style={{ color: "#D97706", textDecoration: "underline", fontWeight: 700 }}>Paramètres de l'application</a>.</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
          background: "#FEF2F2", border: "1px solid #FEE2E2", borderRadius: 10,
          color: "#EF4444", fontSize: 12.5, fontWeight: 500
        }}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, alignItems: "start" }}>
        {/* Left Config Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Description de la vidéo</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", fontSize: 12, fontFamily: "var(--font-sans)", lineHeight: 1.6, resize: "none", color: "var(--text-primary)", background: "var(--bg-subtle)", outline: "none" }}
              onFocus={(e) => { (e.target).style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { (e.target).style.borderColor = "var(--border)"; }}
            />
          </div>

          <div className="card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Options vidéo</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Durée", state: duration, setState: setDuration, options: ["5 secondes", "15 secondes", "30 secondes", "60 secondes", "90 secondes"] },
                { label: "Format", state: format, setState: setFormat, options: ["Reel (9:16)", "Story (9:16)", "Post (1:1)", "YouTube (16:9)"] },
                { label: "Style", state: style, setState: setStyle, options: ["Cinématique", "Dynamique", "Minimaliste", "Vintage"] },
                { label: "Réseau cible", state: network, setState: setNetwork, options: ["Instagram", "TikTok", "Facebook", "YouTube"] },
              ].map((opt) => (
                <div key={opt.label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 5 }}>{opt.label}</div>
                  <select
                    className="input"
                    value={opt.state}
                    onChange={(e) => opt.setState(e.target.value)}
                    style={{ fontSize: 12, padding: "7px 10px", width: "100%" }}
                  >
                    {opt.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={generate} disabled={generating} style={{ width: "100%", padding: "12px", fontSize: 13, justifyContent: "center" }}>
            {generating ? (
              <>
                <RefreshCw size={15} style={{ animation: "spin 1.5s linear infinite" }} />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>Générer avec Gemini</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Panel */}
        <div>
          {generating && (
            <div className="card" style={{ padding: "80px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
                Calcul du concept et du storyboard par Gemini IA...
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 460, margin: "0 auto 24px auto" }}>
                Notre intelligence artificielle rédige vos scènes clés, calibre le rythme musical et compose la voix-off optimale pour votre réseau cible.
              </p>
              <div style={{ height: 4, borderRadius: 99, background: "var(--bg-muted)", overflow: "hidden", maxWidth: 300, margin: "0 auto" }}>
                <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #EF4444, #F59E0B)", borderRadius: 99, animation: "shimmer 1.4s ease infinite" }} />
              </div>
            </div>
          )}

          {generated && !generating && (
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
              {/* Left col: Variations list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Variations proposées ({videos.length})</span>
                  <button className="btn btn-secondary" style={{ fontSize: 11, padding: "6px 12px" }} onClick={generate}>
                    <RefreshCw size={12} /> Réessayer
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {videos.map((video, i) => {
                    const isSelected = selectedVideo?.title === video.title;
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedVideo(video)}
                        style={{
                          padding: 16, borderRadius: 12, border: "1px solid var(--border)",
                          background: isSelected ? "white" : "var(--bg-subtle)",
                          borderColor: isSelected ? video.color || "var(--primary)" : "var(--border)",
                          cursor: "pointer", transition: "all 0.15s", textAlign: "left",
                          boxShadow: isSelected ? "var(--shadow-md)" : "none"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{
                            fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                            background: (video.color || "#7C3AED") + "15",
                            color: video.color || "#7C3AED"
                          }}>
                            {video.style}
                          </span>
                          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={11} /> {video.duration || duration}
                          </span>
                        </div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px 0", color: "var(--text-primary)" }}>
                          {video.title}
                        </h4>
                        <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>
                          {video.voiceover}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right col: Selected storyboard detail */}
              {selectedVideo && (
                <div className="card" style={{ padding: 20, textAlign: "left", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 2px 0" }}>
                      {selectedVideo.title}
                    </h3>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
                      Format : {format} · Style : {selectedVideo.style}
                    </span>
                  </div>

                  {/* Voiceover block */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      🎤 Voix-off Suggérée
                    </label>
                    <div style={{ padding: 12, borderRadius: 8, background: "var(--bg-app)", border: "1px solid var(--border)", fontSize: 12, lineHeight: 1.5, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
                      {selectedVideo.voiceover}
                    </div>
                  </div>

                  {/* Scenes List */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      🎬 Séquencier Plan-par-Plan
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 260, overflowY: "auto", paddingRight: 4 }}>
                      {selectedVideo.scenes?.map((scene: any, index: number) => (
                        <div key={index} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", fontSize: 11.5 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: selectedVideo.color || "var(--primary)", marginBottom: 4 }}>
                            <span>Plan #{index + 1}</span>
                            <span>{scene.time}</span>
                          </div>
                          <div style={{ color: "var(--text-primary)", marginBottom: 2 }}>
                            <strong>Visuel :</strong> {scene.visual}
                          </div>
                          <div style={{ color: "var(--text-secondary)" }}>
                            <strong>Son :</strong> {scene.audio}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Caption & Quick Copy */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <span>📝 Légende réseaux sociaux</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedVideo.caption);
                          setCopiedIndex(1);
                          setTimeout(() => setCopiedIndex(null), 2000);
                        }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}
                      >
                        {copiedIndex === 1 ? <Check size={11} /> : <Copy size={11} />}
                        <span>{copiedIndex === 1 ? "Copié !" : "Copier"}</span>
                      </button>
                    </label>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", background: "var(--bg-app)", padding: 8, borderRadius: 6, border: "1px solid var(--border)", fontStyle: "italic", whiteSpace: "pre-wrap" }}>
                      {selectedVideo.caption}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!generated && !generating && (
            <div className="card" style={{ padding: "80px 40px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", padding: 16, borderRadius: 16, background: "var(--bg-muted)", color: "var(--primary)", marginBottom: 16 }}>
                <Video size={40} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Vos concepts et storyboards Gemini s'afficheront ici</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 360, margin: "0 auto" }}>
                Rédigez la thématique de votre vidéo à gauche puis lancez la génération pour composer vos plans vidéo avec Gemini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
