"use client";

import { FolderOpen, Image, Video, FileText, Music, Filter, Search, Grid2x2, List, Upload } from "lucide-react";

const mockMedia = [
  { id: "m1", name: "Logo-MaisonBlanc.png", type: "image", client: "Maison Blanc", size: "234 KB", date: "2026-07-08", color: "#F59E0B" },
  { id: "m2", name: "Reel-FloreEte.mp4", type: "video", client: "Flore & Co", size: "12.4 MB", date: "2026-07-09", color: "#7C3AED" },
  { id: "m3", name: "Charte-TechNova.pdf", type: "doc", client: "TechNova", size: "1.2 MB", date: "2026-07-05", color: "#2563EB" },
  { id: "m4", name: "Photo-Restaurant-01.jpg", type: "image", client: "Maison Blanc", size: "4.1 MB", date: "2026-07-10", color: "#F59E0B" },
  { id: "m5", name: "Jingle-BioNature.mp3", type: "audio", client: "BioNature", size: "3.2 MB", date: "2026-07-07", color: "#84CC16" },
  { id: "m6", name: "Lookbook-Ete-2026.pdf", type: "doc", client: "Flore & Co", size: "8.7 MB", date: "2026-07-04", color: "#7C3AED" },
  { id: "m7", name: "Villa-CotedAzur.jpg", type: "image", client: "Immo Prestige", size: "5.6 MB", date: "2026-07-09", color: "#10B981" },
  { id: "m8", name: "Campagne-Ete-IG.mp4", type: "video", client: "Évasion Travel", size: "24.3 MB", date: "2026-07-06", color: "#0EA5E9" },
];

const typeIcons: Record<string, React.ReactNode> = {
  image: <Image size={14} color="#2563EB" />,
  video: <Video size={14} color="#7C3AED" />,
  doc: <FileText size={14} color="#F59E0B" />,
  audio: <Music size={14} color="#10B981" />,
};

function getLargeIcon(type: string, color: string) {
  const props = { size: 32, color };
  switch (type) {
    case "image": return <Image {...props} />;
    case "video": return <Video {...props} />;
    case "doc": return <FileText {...props} />;
    case "audio": return <Music {...props} />;
    default: return <FolderOpen {...props} />;
  }
}

export default function BibliothequePage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Bibliothèque</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Tous vos médias et ressources centralisés</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "9px 18px" }}>
          <Upload size={15} />
          Uploader
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[
          { icon: Image, label: "Images", count: 3, color: "#2563EB" },
          { icon: Video, label: "Vidéos", count: 2, color: "#7C3AED" },
          { icon: FileText, label: "Documents", count: 2, color: "#F59E0B" },
          { icon: Music, label: "Audio", count: 1, color: "#10B981" },
        ].map((t) => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", cursor: "pointer", fontSize: 12 }}>
            <t.icon size={14} color={t.color} />
            <span style={{ fontWeight: 500 }}>{t.label}</span>
            <span style={{ color: "var(--text-muted)" }}>({t.count})</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input" style={{ paddingLeft: 30, width: 200, fontSize: 12, height: 36 }} placeholder="Rechercher..." />
          </div>
          <button className="btn btn-secondary" style={{ padding: "0 10px", height: 36 }}><Grid2x2 size={14} /></button>
          <button className="btn btn-secondary" style={{ padding: "0 10px", height: 36 }}><List size={14} /></button>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {mockMedia.map((file, i) => (
          <div>
            {/* Preview */}
            <div style={{
              height: 140, display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${file.color}18, ${file.color}30)`,
              fontSize: 40,
            }}>
              {getLargeIcon(file.type, file.color)}
            </div>
            {/* Info */}
            <div style={{ padding: "12px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-secondary)" }}>
                  {typeIcons[file.type]}
                  {file.client}
                </div>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{file.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
