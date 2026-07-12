"use client";

import { useState, useRef } from "react";
import { FolderOpen, Image, Video, FileText, Music, Search, Grid2x2, List, Upload, Trash2, Library } from "lucide-react";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video" | "doc" | "audio";
  client: string;
  size: string;
  date: string;
  color: string;
}

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
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles: MediaFile[] = Array.from(e.target.files).map((file, index) => {
      const type: MediaFile["type"] = file.type.startsWith("video/") 
        ? "video" 
        : file.type.startsWith("audio/") 
          ? "audio" 
          : file.type.startsWith("image/") 
            ? "image" 
            : "doc";

      const colors = ["#2563EB", "#7C3AED", "#F59E0B", "#10B981", "#EF4444"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const sizeKB = Math.round(file.size / 1024);
      const sizeStr = sizeKB > 1024 
        ? `${(sizeKB / 1024).toFixed(1)} MB` 
        : `${sizeKB} KB`;

      return {
        id: `m-${Date.now()}-${index}`,
        name: file.name,
        type,
        client: "Mon Espace",
        size: sizeStr,
        date: new Date().toISOString().split("T")[0],
        color: randomColor
      };
    });

    setMediaList(prev => [...newFiles, ...prev]);
  };

  const deleteFile = (id: string) => {
    setMediaList(prev => prev.filter(f => f.id !== id));
  };

  const filteredMedia = mediaList.filter(file => 
    file.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    file.client.toLowerCase().includes(searchVal.toLowerCase())
  );

  const stats = [
    { icon: Image, label: "Images", count: mediaList.filter(f => f.type === "image").length, color: "#2563EB" },
    { icon: Video, label: "Vidéos", count: mediaList.filter(f => f.type === "video").length, color: "#7C3AED" },
    { icon: FileText, label: "Documents", count: mediaList.filter(f => f.type === "doc").length, color: "#F59E0B" },
    { icon: Music, label: "Audio", count: mediaList.filter(f => f.type === "audio").length, color: "#10B981" },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Bibliothèque</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Tous vos médias et ressources de marque centralisés</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "9px 18px" }} onClick={() => fileInputRef.current?.click()}>
          <Upload size={15} />
          Uploader
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          multiple 
          hidden 
          onChange={handleUpload}
          accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.txt"
        />
      </div>

      {/* Stats & Search */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {stats.map((t) => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", fontSize: 12 }}>
            <t.icon size={14} color={t.color} />
            <span style={{ fontWeight: 500 }}>{t.label}</span>
            <span style={{ color: "var(--text-muted)" }}>({t.count})</span>
          </div>
        ))}
        
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              className="input" 
              style={{ paddingLeft: 30, width: 220, fontSize: 12, height: 36 }} 
              placeholder="Rechercher..." 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary" style={{ padding: "0 10px", height: 36 }}><Grid2x2 size={14} /></button>
          <button className="btn btn-secondary" style={{ padding: "0 10px", height: 36 }}><List size={14} /></button>
        </div>
      </div>

      {/* Grid Content */}
      {filteredMedia.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filteredMedia.map((file) => (
            <div 
              key={file.id} 
              style={{ 
                borderRadius: 12, 
                border: "1px solid var(--border)", 
                overflow: "hidden", 
                background: "var(--bg)",
                transition: "all 0.2s"
              }}
            >
              {/* Preview */}
              <div style={{
                height: 140, display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, ${file.color}10, ${file.color}25)`,
                borderBottom: "1px solid var(--border)"
              }}>
                {getLargeIcon(file.type, file.color)}
              </div>
              {/* Info */}
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-primary)" }}>
                  {file.name}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>
                    {typeIcons[file.type]}
                    {file.client}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600 }}>{file.size}</span>
                    <button 
                      onClick={() => deleteFile(file.id)}
                      style={{ 
                        background: "none", border: "none", cursor: "pointer", 
                        color: "var(--text-muted)", padding: 2, borderRadius: 4,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: "80px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ display: "inline-flex", padding: 16, borderRadius: 16, background: "var(--bg-muted)", color: "var(--primary)" }}>
            <Library size={40} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Votre bibliothèque est vide</h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 360, margin: "0 auto" }}>
              Cliquez sur le bouton "Uploader" ci-dessus pour importer vos logos, chartes graphiques, images ou fichiers audio de marque.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
