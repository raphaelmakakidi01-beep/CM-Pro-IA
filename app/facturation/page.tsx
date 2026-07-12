"use client";

import { useState } from "react";
import { mockInvoices, mockClients } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel, formatCurrency } from "@/lib/utils";
import { Plus, Download, CreditCard, TrendingUp, AlertCircle, CheckCircle, X, Settings, LayoutList, Upload, Eye, FileText, Check } from "lucide-react";

export default function FacturationPage() {
  const [activeTab, setActiveTab] = useState<"list" | "settings">("list");
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for new invoice
  const [selectedClient, setSelectedClient] = useState(mockClients[0]?.name || "");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Invoice configuration / settings states
  const [activeTemplate, setActiveTemplate] = useState("stripe");
  const [companyName, setCompanyName] = useState("CM-IA PRO Agency");
  const [companySiret, setCompanySiret] = useState("842 901 324 00012");
  const [companyVat, setCompanyVat] = useState("FR 53 842901324");
  const [companyAddress, setCompanyAddress] = useState("24 Rue de la Paix, 75002 Paris");
  const [companyIban, setCompanyIban] = useState("FR76 3000 6000 0001 2345 6789 101");
  const [invoiceLogo, setInvoiceLogo] = useState<string | null>("/mock-logo.png");
  const [isSavedNotification, setIsSavedNotification] = useState(false);

  // Templates definition
  const templates = [
    { id: "stripe", name: "Moderne (Stripe)", desc: "En-tête épuré avec bandeau coloré, idéal pour le SaaS.", border: "2px solid #635BFF" },
    { id: "linear", name: "Minimaliste (Linear)", desc: "Style ultra-pro en tons sombres et typographie fine.", border: "2px solid #000000" },
    { id: "notion", name: "Classique (Notion)", desc: "Mise en page standard en noir & blanc avec police Serif.", border: "2.5px solid #F1F5F9" },
  ];

  // Dynamically calculate KPIs based on current invoices state
  const totalRevenue = invoices
    .filter(inv => inv.status === "published")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === "scheduled" || inv.status === "draft")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidCount = invoices.filter(inv => inv.status === "published").length;

  const stats = [
    { label: "Revenus encaissés", value: formatCurrency(totalRevenue), icon: TrendingUp, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" },
    { label: "Factures totales", value: String(invoices.length), icon: CreditCard, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" },
    { label: "En attente de paiement", value: formatCurrency(pendingAmount), icon: AlertCircle, color: "#F59E0B", bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)" },
    { label: "Payées", value: String(paidCount), icon: CheckCircle, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" },
  ];

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !dueDate) return;

    const nextNum = invoices.length + 1;
    const newInvoice = {
      id: `inv${nextNum}`,
      client: selectedClient,
      amount: parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      dueDate: dueDate,
      status: "scheduled" as const,
    };

    setInvoices([newInvoice, ...invoices]);
    setIsModalOpen(false);
    setAmount("");
    setDueDate("");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedNotification(true);
    setTimeout(() => setIsSavedNotification(false), 3000);
  };

  const handleLogoUploadSimulate = () => {
    // Simulate logo uploading by setting a mock image or alert
    setInvoiceLogo("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Facturation</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Gérez vos factures clients et configurez vos modèles</p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {/* Sub Navigation Tabs */}
          <div style={{ display: "flex", background: "var(--bg-muted)", borderRadius: 9, padding: 3, gap: 2 }}>
            <button
              onClick={() => setActiveTab("list")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 7, border: "none",
                fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: activeTab === "list" ? "var(--bg)" : "transparent",
                color: activeTab === "list" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: activeTab === "list" ? "var(--shadow-sm)" : "none",
              }}
            >
              <LayoutList size={14} />
              Liste des factures
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 7, border: "none",
                fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: activeTab === "settings" ? "var(--bg)" : "transparent",
                color: activeTab === "settings" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: activeTab === "settings" ? "var(--shadow-sm)" : "none",
              }}
            >
              <Settings size={14} />
              Modèles & Paramètres
            </button>
          </div>

          {activeTab === "list" && (
            <button 
              className="btn btn-primary" 
              style={{ padding: "9px 18px", gap: 6 }}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={15} />
              Nouvelle facture
            </button>
          )}
        </div>
      </div>

      {/* Notifications Toast */}
      {isSavedNotification && (
        <div style={{
          position: "fixed", top: 20, right: 20,
          background: "#10B981", color: "white", padding: "12px 20px",
          borderRadius: 8, boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 8,
          zIndex: 1000, fontSize: 13, fontWeight: 600, animation: "fadeIn 0.2s"
        }}>
          <Check size={16} />
          Paramètres de facturation sauvegardés !
        </div>
      )}

      {/* ── TAB 1: LIST VIEW ── */}
      {activeTab === "list" && (
        <>
          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} className="card" style={{ padding: "18px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={16} color={s.color} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{s.label}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="card" style={{ overflow: "hidden", padding: 0 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600 }}>Toutes les factures</h3>
              <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 8 }}>
                <span>Modèle actif : <strong style={{ textTransform: "capitalize", color: "var(--text-primary)" }}>{activeTemplate}</strong></span>
                {invoiceLogo && <span>· Logo intégré</span>}
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)" }}>
                  {["N° Facture", "Client", "Montant", "Date émission", "Échéance", "Statut", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}
                    style={{ borderTop: "1px solid var(--border)", cursor: "pointer" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>
                      {inv.id.toUpperCase().replace("INV", "FAC-")}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500 }}>{inv.client}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700 }}>{formatCurrency(inv.amount)}</td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{inv.date}</td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{inv.dueDate}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={getStatusColor(inv.status)} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                        {getStatusLabel(inv.status)}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", display: "flex", gap: 5 }}>
                      <button title="Visualiser (Simulé)" style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                        <Eye size={12} />
                      </button>
                      <button title="Télécharger le PDF" style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                        <Download size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── TAB 2: SETTINGS VIEW (NEW) ── */}
      {activeTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          
          {/* Main configuration form */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Paramètres par défaut des factures</h3>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 20 }}>Ces données s'afficheront sur toutes vos futures factures émises.</p>
            
            <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Nom légal de l'entreprise</label>
                  <input className="input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>N° SIRET / Registre du commerce</label>
                  <input className="input" value={companySiret} onChange={(e) => setCompanySiret(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>N° TVA Intracommunautaire</label>
                  <input className="input" value={companyVat} onChange={(e) => setCompanyVat(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Coordonnées bancaires (IBAN)</label>
                  <input className="input" value={companyIban} onChange={(e) => setCompanyIban(e.target.value)} required />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Adresse postale du siège social</label>
                <input className="input" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required />
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 8 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Sélection du modèle de facture</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {templates.map((tpl) => {
                    const active = activeTemplate === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setActiveTemplate(tpl.id)}
                        style={{
                          padding: 12, borderRadius: 10, border: active ? tpl.border : "1.5px solid var(--border)",
                          background: active ? "var(--bg-subtle)" : "var(--bg)",
                          cursor: "pointer", transition: "all 0.15s ease",
                          display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 90
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{tpl.name}</span>
                        <span style={{ fontSize: 9.5, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.3 }}>{tpl.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button type="submit" className="btn btn-primary" style={{ padding: "9px 20px" }}>Enregistrer les paramètres</button>
              </div>
            </form>
          </div>

          {/* Logo Upload Panel & Mock View */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Logo box */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Logo de facture</h3>
              
              {invoiceLogo ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: 12, border: "1px solid var(--border)",
                    margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", background: "white"
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={invoiceLogo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button className="btn btn-secondary" style={{ fontSize: 11, height: 26, padding: "0 10px" }} onClick={handleLogoUploadSimulate}>Changer</button>
                    <button className="btn btn-secondary" style={{ fontSize: 11, height: 26, padding: "0 10px", color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }} onClick={() => setInvoiceLogo(null)}>Supprimer</button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleLogoUploadSimulate}
                  style={{
                    border: "1.5px dashed var(--border)", borderRadius: 12, padding: "24px 16px",
                    textAlign: "center", cursor: "pointer", transition: "all 0.15s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <Upload size={20} style={{ color: "var(--text-secondary)", marginBottom: 8, marginLeft: "auto", marginRight: "auto", display: "block" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, display: "block", color: "var(--text-primary)" }}>Glissez votre logo</span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, display: "block" }}>PNG, JPG · Max 500 KB</span>
                </div>
              )}
            </div>

            {/* Quick Preview Panel */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Aperçu rapide</h3>
              <div style={{
                border: activeTemplate === "stripe" ? "1px solid rgba(99, 91, 255, 0.25)" : activeTemplate === "linear" ? "1px solid #111" : "1px solid #777",
                borderRadius: 8,
                padding: 12,
                background: "white",
                color: "#1e293b",
                fontSize: 10,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxShadow: "var(--shadow-sm)",
                fontFamily: activeTemplate === "notion" ? "Georgia, serif" : "var(--font-sans)",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Stripe Accent Top Line */}
                {activeTemplate === "stripe" && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#635BFF" }} />
                )}

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 6, marginTop: activeTemplate === "stripe" ? 3 : 0 }}>
                  {invoiceLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={invoiceLogo} alt="Logo" style={{ height: 16, maxWidth: 50, objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: 8, fontWeight: 700 }}>[Logo]</span>
                  )}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 8, color: activeTemplate === "linear" ? "#111" : "inherit" }}>{companyName}</div>
                    <div style={{ fontSize: 6, color: "#64748b" }}>{companyAddress}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 7, fontWeight: 700, color: activeTemplate === "stripe" ? "#635BFF" : "#1e293b" }}>FACTURE N° FAC-007</div>
                  <div style={{ fontSize: 6, color: "#64748b" }}>Émis le: {new Date().toLocaleDateString("fr-FR")}</div>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: activeTemplate === "stripe" ? "#f5f6ff" : activeTemplate === "linear" ? "#fafafa" : "transparent",
                  border: activeTemplate === "notion" ? "1px solid #000" : "none",
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 4
                }}>
                  <span style={{ fontWeight: activeTemplate === "notion" ? 700 : 400 }}>Prestation CM-IA PRO</span>
                  <span style={{ fontWeight: 700 }}>1 500,00 €</span>
                </div>
                <div style={{
                  fontSize: 6,
                  color: "#94a3b8",
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: 6,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Design : {activeTemplate}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── CREATE INVOICE MODAL ── */}
      {isModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15,23,42,0.3)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999
        }}>
          <div className="card" style={{ width: "100%", maxWidth: 440, padding: "24px", position: "relative" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: 16, right: 16, border: "none", background: "none", cursor: "pointer", color: "var(--text-secondary)" }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Créer une facture</h3>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 20 }}>Renseignez les détails de la prestation</p>

            <form onSubmit={handleCreateInvoice} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Select Client */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Client destinataire</label>
                <select 
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  style={{
                    width: "100%", height: 38, padding: "0 10px", borderRadius: 8,
                    border: "1px solid var(--border)", background: "var(--bg)",
                    fontSize: 13, color: "var(--text-primary)", outline: "none"
                  }}
                >
                  {mockClients.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>

              {/* Amount input */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Montant (€)</label>
                <input 
                  type="number"
                  className="input"
                  required
                  placeholder="Ex: 1500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Due Date */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Date d'échéance</label>
                <input 
                  type="date"
                  className="input"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {/* Preferences preview */}
              <div style={{ display: "flex", gap: 12, background: "var(--bg-subtle)", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 11, color: "var(--text-secondary)" }}>
                <FileText size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  La facture sera générée avec le modèle <strong style={{ textTransform: "capitalize", color: "var(--text-primary)" }}>{activeTemplate}</strong>. 
                  {invoiceLogo ? " Le logo officiel configuré sera apposé en en-tête." : " Aucun logo configuré."}
                </div>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, height: 38, justifyContent: "center" }}>
                  Créer la facture
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ height: 38, justifyContent: "center" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
