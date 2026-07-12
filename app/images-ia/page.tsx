"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, Sparkles, Download, RefreshCw, ZoomIn, X, Check, Palette } from "lucide-react";

const mockImages = [
  { id: "i1", style: "Gourmet & Gastronomie", src: "/mock-images/food_gourmet.png" },
  { id: "i2", style: "Espace de Travail", src: "/mock-images/creative_workspace.png" },
  { id: "i3", style: "Tech & Innovation", src: "/mock-images/tech_minimalist.png" },
  { id: "i4", style: "Style Architectural", src: "/mock-images/minimalist_lifestyle.png" },
  { id: "i5", style: "Luxe & Prestige", src: "/mock-images/luxury_product.png" },
  { id: "i6", style: "Abstract Mesh Gradient", src: "/mock-images/abstract_mesh.png" },
];

function ImageCard({ img, selected, onSelect, onZoom }: { img: typeof mockImages[0]; selected: boolean; onSelect: () => void; onZoom: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        boxShadow: selected ? "0 0 0 2px var(--primary), var(--shadow-md)" : "var(--shadow-sm)",
      }}
      className="image-card-hover"
    >
      <div style={{ height: 165, position: "relative", overflow: "hidden", background: "var(--bg-muted)" }}>
        <img
          src={img.src}
          alt={img.style}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
          className="card-image"
        />
        {selected && (
          <div style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <Check size={12} color="white" strokeWidth={3} />
          </div>
        )}
      </div>
      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-primary)" }}>{img.style}</span>
        <div style={{ display: "flex", gap: 4 }} onClick={(e) => e.stopPropagation()}>
          <a
            href={img.src}
            download={`${img.id}.png`}
            title="Télécharger"
            className="btn btn-secondary"
            style={{ width: 26, height: 26, borderRadius: 6, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Download size={12} />
          </a>
          <button
            onClick={onZoom}
            title="Agrandir"
            className="btn btn-secondary"
            style={{ width: 26, height: 26, borderRadius: 6, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ZoomIn size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ImagesIAPage() {
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("Post Instagram pour un restaurant avec des couleurs chaudes et un plat gastronomique");
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [zoomImage, setZoomImage] = useState<typeof mockImages[0] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const generate = async () => {
    setGenerating(true);
    setGenerated(false);
    setSelected([]);
    await new Promise((r) => setTimeout(r, 2200));
    setGenerating(false);
    setGenerated(true);
  };

  const toggleSelect = (id: string) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Local hover styles */}
      <style>{`
        .image-card-hover:hover .card-image {
          transform: scale(1.05);
        }
        .image-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED, #EC4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={16} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Générateur Images IA</h1>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Générez des visuels professionnels et appliquez votre charte graphique en haute définition.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, alignItems: "start" }}>
        {/* Config panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Upload */}
          <div className="card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Ressources de marque</h3>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed var(--border)",
                borderRadius: 10,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.15s",
                marginBottom: 10,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Upload size={20} style={{ margin: "0 auto 8px", color: "var(--text-muted)" }} />
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3 }}>Glissez vos fichiers</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Logo, photos, charte graphique</div>
            </div>
            <input ref={fileRef} type="file" multiple hidden onChange={(e) => {
              if (e.target.files) setUploaded(Array.from(e.target.files).map(f => f.name));
            }} />
            {uploaded.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {uploaded.map((f, i) => (
                  <div key={i} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, background: "var(--bg-muted)", color: "var(--text-secondary)" }}>{f}</div>
                ))}
              </div>
            )}
          </div>

          {/* Prompt */}
          <div className="card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Description</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              style={{
                width: "100%", border: "1px solid var(--border)", borderRadius: 8,
                padding: "10px 12px", fontSize: 12, fontFamily: "var(--font-sans)",
                lineHeight: 1.6, resize: "none", color: "var(--text-primary)",
                background: "var(--bg-subtle)", outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => { (e.target).style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { (e.target).style.borderColor = "var(--border)"; }}
              placeholder="Décrivez le visuel que vous souhaitez créer..."
            />
          </div>

          {/* Options */}
          <div className="card" style={{ padding: "18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Options</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Format", options: ["Post carré (1:1)", "Story (9:16)", "Bannière (16:9)", "Carrousel"] },
                { label: "Réseau", options: ["Instagram", "LinkedIn", "Facebook", "TikTok"] },
                { label: "Nombre de visuels", options: ["6 visuels", "12 visuels"] },
              ].map((opt) => (
                <div key={opt.label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 5 }}>{opt.label}</div>
                  <select className="input" style={{ fontSize: 12, padding: "7px 10px", width: "100%" }}>
                    {opt.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            className="btn btn-primary"
            onClick={generate}
            disabled={generating}
            style={{ width: "100%", padding: "12px", fontSize: 13, justifyContent: "center" }}
          >
            {generating ? (
              <>
                <RefreshCw size={15} style={{ animation: "spin 1.5s linear infinite" }} />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>Générer les visuels</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div>
          {generating && (
            <div className="card" style={{ padding: "80px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
                Composition et rendus graphiques en cours...
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 24, maxWidth: 460, margin: "0 auto 24px auto" }}>
                Notre moteur de rendu intelligent fusionne vos chartes avec le moteur d'intelligence créative Imagen 3.
              </p>
              <div style={{ height: 4, borderRadius: 99, background: "var(--bg-muted)", overflow: "hidden", maxWidth: 300, margin: "0 auto" }}>
                <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg, #7C3AED, #EC4899)", borderRadius: 99, animation: "shimmer 1.4s ease infinite" }} />
              </div>
            </div>
          )}

          {generated && !generating && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>6 visuels uniques créés</span>
                  {selected.length > 0 && <span style={{ fontSize: 12, color: "var(--text-secondary)", marginLeft: 8 }}>({selected.length} sélectionné)</span>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-secondary" style={{ fontSize: 12, padding: "7px 12px" }} onClick={generate}>
                    <RefreshCw size={13} /> Régénérer
                  </button>
                  {selected.length > 0 && (
                    <button className="btn btn-primary" style={{ fontSize: 12, padding: "7px 12px" }} onClick={() => {
                      selected.forEach((id) => {
                        const img = mockImages.find(m => m.id === id);
                        if (img) window.open(img.src, "_blank");
                      });
                    }}>
                      <Download size={13} /> Télécharger ({selected.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Image Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {mockImages.map((img) => (
                  <ImageCard
                    key={img.id}
                    img={img}
                    selected={selected.includes(img.id)}
                    onSelect={() => toggleSelect(img.id)}
                    onZoom={() => setZoomImage(img)}
                  />
                ))}
              </div>

              {/* Actions panel */}
              <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "center" }}>
                {["Générer des variations", "Mise à l'échelle (Upscale 4K)", "Adapter à un autre format", "Incruster texte / Logo"].map((action) => (
                  <button key={action} className="btn btn-secondary" style={{ fontSize: 12, padding: "8px 16px" }} disabled={selected.length === 0}>
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!generated && !generating && (
            <div className="card" style={{ padding: "80px 40px", textAlign: "center" }}>
              <div style={{ display: "inline-flex", padding: 16, borderRadius: 16, background: "var(--bg-muted)", color: "var(--primary)", marginBottom: 16 }}>
                <Palette size={40} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Vos rendus d'images s'afficheront ici</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 360, margin: "0 auto" }}>
                Configurez vos options de format à gauche et décrivez le sujet de votre visuel pour composer votre première grille d'images de marque.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* HD Lightbox Preview Modal */}
      {zoomImage && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 24,
          animation: "fadeIn 0.25s ease-out"
        }} onClick={() => setZoomImage(null)}>
          <div style={{
            background: "var(--bg)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            maxWidth: 700,
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            boxShadow: "var(--shadow-2xl)",
            display: "flex",
            flexDirection: "column",
            animation: "scaleIn 0.2s ease-out"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Aperçu Haute Définition</h4>
              <button className="btn btn-secondary" style={{ width: 28, height: 28, borderRadius: "50%", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setZoomImage(null)}>
                <X size={14} />
              </button>
            </div>
            <div style={{ flex: 1, overflow: "auto", background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
              <img src={zoomImage.src} alt={zoomImage.style} style={{ maxWidth: "100%", maxHeight: "55vh", objectFit: "contain", borderRadius: 8, boxShadow: "var(--shadow-lg)" }} />
            </div>
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{zoomImage.style}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Format : 1024 x 1024 px · Modèle : Imagen 3 (Haute Définition)</div>
              </div>
              <a href={zoomImage.src} download={`${zoomImage.id}.png`} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12 }}>
                <Download size={13} /> Télécharger
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
