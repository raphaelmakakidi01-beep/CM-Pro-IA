"use client";
import { useState } from "react";

import { mockCalendarEvents, networkColors, networkLabels } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, Calendar, Grid3X3, AlignJustify, X, Eye, Check, Save, Clock, Music2, Share2 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { InstagramIcon, FacebookIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

type ViewMode = "month" | "week" | "day";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const networkIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon size={12} />,
  facebook: <FacebookIcon size={12} />,
  linkedin: <LinkedinIcon size={12} />,
  tiktok: <Music2 size={12} />,
  twitter: <TwitterIcon size={12} />,
  youtube: <YoutubeIcon size={12} />,
  pinterest: <Share2 size={12} />,
};

const getEventMockContent = (event: any) => {
  const defaults: Record<string, { text: string; mediaUrl: string; tags: string }> = {
    instagram: {
      text: `✨ Nouvelle collection maintenant disponible ! Matières légères et coupes intemporelles pour vous accompagner sous le soleil. Découvrez les pièces via le lien en bio. ✨`,
      mediaUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&fit=crop",
      tags: "#slowfashion #summeroutfit #organic"
    },
    linkedin: {
      text: `🚀 L'innovation technologique au service de l'efficacité opérationnelle.\n\nNous partageons aujourd'hui nos retours d'expérience sur l'intégration de solutions logicielles avancées au sein de nos équipes. Un gain de temps de 30% mesuré sur le premier trimestre.\n\nEt vous, quelles étapes avez-vous automatisées cette année ? Discutons-en en commentaires !`,
      mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&fit=crop",
      tags: "#business #innovation #saas #productivity"
    },
    facebook: {
      text: `🌿 Prenez soin de vous au naturel. Notre nouvelle gamme hydratante bio est formulée à partir d'ingrédients éco-responsables locaux. Disponible dès maintenant en boutique et en ligne !`,
      mediaUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop",
      tags: "#bio #greenlife #wellness"
    },
    tiktok: {
      text: `POV: Les coulisses de notre shooting d'été ☀️🎬 Vous préférez quel look ? Dites-le nous en commentaire !`,
      mediaUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&fit=crop",
      tags: "#behindthescenes #bts #lookbook #aesthetic"
    },
    twitter: {
      text: `🧵 Thread : Comment nous avons optimisé notre infrastructure cloud pour supporter une hausse de trafic de 400% sans interruption de service. Les 4 étapes clés :👇`,
      mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&fit=crop",
      tags: "#devops #sysadmin #saas"
    },
    pinterest: {
      text: `Inspirations minimalistes pour un intérieur moderne et apaisant. Palette de couleurs douces et matières naturelles. 🏡✨`,
      mediaUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&fit=crop",
      tags: "#interiordesign #minimalism #homesweethome"
    }
  };

  const config = defaults[event.network] || defaults.linkedin;

  let text = config.text;
  if (event.title) {
    if (event.network === "linkedin") {
      text = `🚀 Focus sur : "${event.title}"\n\n${config.text.split("\n\n").slice(1).join("\n\n")}`;
    } else {
      text = `✨ ${event.title} ✨\n\n${config.text}`;
    }
  }

  return {
    ...event,
    text,
    mediaUrl: config.mediaUrl,
    tags: config.tags
  };
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 10));
  const [view, setView] = useState<ViewMode>("month");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getEventsForDay = (date: Date) =>
    mockCalendarEvents.filter((e) => isSameDay(new Date(e.date), date));

  // Dynamic previous navigation
  const handlePrev = () => {
    if (view === "month") setCurrentDate(subMonths(currentDate, 1));
    else if (view === "week") setCurrentDate(subWeeks(currentDate, 1));
    else if (view === "day") setCurrentDate(subDays(currentDate, 1));
  };

  // Dynamic next navigation
  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "week") setCurrentDate(addWeeks(currentDate, 1));
    else if (view === "day") setCurrentDate(addDays(currentDate, 1));
  };

  // Navigation title label based on current mode
  const getNavigationLabel = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy", { locale: fr });
    } else if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `Semaine du ${format(start, "d MMMM", { locale: fr })} au ${format(end, "d MMMM yyyy", { locale: fr })}`;
    } else {
      return format(currentDate, "EEEE d MMMM yyyy", { locale: fr });
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 108px)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Calendrier</h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Planifiez et visualisez toutes vos publications</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* View switcher */}
          <div style={{ display: "flex", background: "var(--bg-muted)", borderRadius: 9, padding: 3, gap: 2 }}>
            {([
              { mode: "month" as ViewMode, icon: Grid3X3, label: "Mois" },
              { mode: "week" as ViewMode, icon: AlignJustify, label: "Semaine" },
              { mode: "day" as ViewMode, icon: Calendar, label: "Jour" },
            ]).map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 12px", borderRadius: 7, border: "none",
                  fontSize: 12, fontWeight: view === mode ? 600 : 400,
                  background: view === mode ? "var(--bg)" : "transparent",
                  color: view === mode ? "var(--text-primary)" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.15s",
                  boxShadow: view === mode ? "var(--shadow-sm)" : "none",
                }}
              >
                <Icon size={13} />{label}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={handlePrev} className="btn btn-secondary" style={{ padding: "7px 10px" }}>
              <ChevronLeft size={15} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, minWidth: 200, textAlign: "center" }}>
              {getNavigationLabel()}
            </span>
            <button onClick={handleNext} className="btn btn-secondary" style={{ padding: "7px 10px" }}>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", flexShrink: 0 }}>
        {Object.entries(networkColors).slice(0, 6).map(([net, color]) => (
          <div key={net} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-secondary)" }}>
            <div style={{ width: 8, height: 8, borderRadius: 3, background: color }} />
            {networkLabels[net]}
          </div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          {["published", "scheduled", "draft"].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-secondary)" }}>
              <div style={{
                width: 16, height: 6, borderRadius: 3,
                background: s === "published" ? "#10B981" : s === "scheduled" ? "#2563EB" : "#94A3B8"
              }} />
              {getStatusLabel(s)}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="card" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", padding: 0 }}>
        {/* Month View */}
        {view === "month" && (
          <>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--border)" }}>
              {DAYS.map((d) => (
                <div key={d} style={{ padding: "10px 12px", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoRows: "1fr", overflow: "auto" }}>
              {days.map((day, i) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isCurrentDay = isToday(day);

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDay(day)}
                    style={{
                      padding: "8px",
                      borderRight: i % 7 < 6 ? "1px solid var(--border)" : "none",
                      borderBottom: "1px solid var(--border)",
                      background: !isCurrentMonth ? "var(--bg-subtle)" : isCurrentDay ? "rgba(37,99,235,0.03)" : "var(--bg)",
                      minHeight: 100,
                      transition: "background 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { if (!isCurrentDay) (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = !isCurrentMonth ? "var(--bg-subtle)" : isCurrentDay ? "rgba(37,99,235,0.03)" : "var(--bg)"; }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: isCurrentDay ? 700 : 400,
                      color: isCurrentDay ? "white" : isCurrentMonth ? "var(--text-primary)" : "var(--text-muted)",
                      background: isCurrentDay ? "var(--primary)" : "transparent",
                      marginBottom: 4,
                    }}>
                      {format(day, "d")}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(getEventMockContent(event));
                          }}
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: event.color + "22",
                            color: event.color,
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            transition: "all 0.12s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = event.color + "44";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = event.color + "22";
                          }}
                        >
                          {event.time} · {event.client}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div style={{ fontSize: 10, color: "var(--text-muted)", paddingLeft: 6 }}>
                          +{dayEvents.length - 3} de plus
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Week View */}
        {view === "week" && (
          <>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--border)" }}>
              {DAYS.map((d) => (
                <div key={d} style={{ padding: "10px 12px", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Week days grid (single row, full height) */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", overflow: "auto", height: "100%" }}>
              {(() => {
                const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
                const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
                const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

                return weekDays.map((day, i) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDay(day)}
                      style={{
                        padding: "16px 12px",
                        borderRight: i < 6 ? "1px solid var(--border)" : "none",
                        background: isCurrentDay ? "rgba(37,99,235,0.03)" : "var(--bg)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: 300,
                        transition: "all 0.15s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { if (!isCurrentDay) (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isCurrentDay ? "rgba(37,99,235,0.03)" : "var(--bg)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>
                          {format(day, "eee d", { locale: fr }).toUpperCase()}
                        </span>
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: isCurrentDay ? 700 : 500,
                          color: isCurrentDay ? "white" : "var(--text-primary)",
                          background: isCurrentDay ? "var(--primary)" : "transparent",
                        }}>
                          {format(day, "d")}
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(getEventMockContent(event));
                            }}
                            style={{
                              fontSize: 10.5,
                              padding: "8px 10px",
                              borderRadius: 8,
                              background: event.color + "15",
                              color: event.color,
                              fontWeight: 600,
                              border: `1px solid ${event.color}25`,
                              textAlign: "left",
                              transition: "all 0.12s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = event.color + "25";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = event.color + "15";
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                              {networkIcons[event.network]}
                              <span style={{ fontSize: 8.5, fontWeight: 700 }}>{event.time}</span>
                            </div>
                            <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: 11 }}>
                              {event.client}
                            </div>
                            <div style={{ fontSize: 9.5, opacity: 0.8, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", marginTop: 2 }}>
                              {event.title}
                            </div>
                          </div>
                        ))}
                        {dayEvents.length === 0 && (
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", marginTop: 24 }}>
                            Aucun post
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </>
        )}

        {/* Day View */}
        {view === "day" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", padding: 32, background: "var(--bg)" }}>
            {(() => {
              const dayEvents = getEventsForDay(currentDate);

              if (dayEvents.length === 0) {
                return (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, height: "100%", color: "var(--text-muted)", minHeight: 300 }}>
                    <Calendar size={48} strokeWidth={1.2} />
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0" }}>Journée libre</h3>
                      <p style={{ fontSize: 12, margin: 0 }}>Aucune publication n'est programmée pour aujourd'hui.</p>
                    </div>
                  </div>
                );
              }

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640, margin: "0 auto", width: "100%" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", borderBottom: "1px solid var(--border)", paddingBottom: 10, marginBottom: 6, textAlign: "left" }}>
                    Publications du jour ({dayEvents.length})
                  </h3>
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(getEventMockContent(event))}
                      style={{
                        padding: 16, borderRadius: 12, border: "1px solid var(--border)",
                        background: "var(--bg-subtle)", cursor: "pointer", transition: "all 0.15s",
                        display: "flex", justifyContent: "space-between", alignItems: "center"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = event.color;
                        e.currentTarget.style.background = "white";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.background = "var(--bg-subtle)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-app)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: event.color }}>{networkIcons[event.network]}</span>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{event.title || "Sans titre"}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                            {event.client} · {event.format} · <Clock size={10} style={{ display: "inline", verticalAlign: "middle" }} /> {event.time}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                          background: event.status === "published" ? "#ECFDF5" : event.status === "scheduled" ? "#EFF6FF" : "#F3F4F6",
                          color: event.status === "published" ? "#10B981" : event.status === "scheduled" ? "#2563EB" : "#4B5563"
                        }}>
                          {getStatusLabel(event.status)}
                        </span>
                        <span style={{ fontSize: 11, color: "var(--primary)", fontWeight: 700 }}>Aperçu →</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ── DAILY AGENDA DRAWER MODAL OVERLAY ── */}
      {selectedDay && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.3)",
          backdropFilter: "blur(3px)", display: "flex", alignItems: "center",
          justifyContent: "flex-end", zIndex: 900
        }}>
          <div style={{
            width: "100%", maxWidth: 420, height: "100%", background: "var(--bg)",
            boxShadow: "-10px 0 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column",
            borderLeft: "1px solid var(--border)"
          }}>
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-subtle)" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Agenda du jour
                </h3>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>
                  {format(selectedDay, "EEEE d MMMM yyyy", { locale: fr })}
                </span>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 6, borderRadius: "50%" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-app)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Event List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {getEventsForDay(selectedDay).length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, height: "100%", textAlign: "center", color: "var(--text-muted)" }}>
                  <Calendar size={36} strokeWidth={1.5} />
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Aucune publication de planifiée pour ce jour.</div>
                </div>
              ) : (
                getEventsForDay(selectedDay).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(getEventMockContent(event))}
                    style={{
                      padding: 14, borderRadius: 12, border: "1px solid var(--border)",
                      background: "var(--bg-subtle)", cursor: "pointer", transition: "all 0.15s",
                      display: "flex", flexDirection: "column", gap: 8, textAlign: "left"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = event.color;
                      e.currentTarget.style.background = "white";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--bg-subtle)";
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, color: "var(--text-secondary)" }}>
                        <Clock size={11} /> {event.time}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                        background: event.status === "published" ? "#ECFDF5" : event.status === "scheduled" ? "#EFF6FF" : "#F3F4F6",
                        color: event.status === "published" ? "#10B981" : event.status === "scheduled" ? "#2563EB" : "#4B5563"
                      }}>
                        {getStatusLabel(event.status)}
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px 0" }}>
                        {event.title || "Sans titre"}
                      </h4>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {event.client} · {event.format}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 8, marginTop: 4 }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        fontSize: 11, fontWeight: 600, color: event.color
                      }}>
                        {networkIcons[event.network]}
                        <span style={{ textTransform: "capitalize" }}>{event.network}</span>
                      </span>
                      <span style={{ fontSize: 10, color: "var(--primary)", fontWeight: 700 }}>Aperçu →</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── EVENT PREVIEW MODAL OVERLAY ── */}
      {selectedEvent && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: 20
        }}>
          <div style={{
            width: "100%", maxWidth: 800, background: "var(--bg)",
            borderRadius: 16, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", maxHeight: "90vh",
            border: "1px solid var(--border)", overflow: "hidden"
          }}>
            {/* Header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "var(--bg-subtle)"
            }}>
              <div style={{ textAlign: "left" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, background: selectedEvent.status === "published" ? "#ECFDF5" : selectedEvent.status === "scheduled" ? "#EFF6FF" : "#F3F4F6",
                  color: selectedEvent.status === "published" ? "#10B981" : selectedEvent.status === "scheduled" ? "#2563EB" : "#4B5563",
                  padding: "2px 8px", borderRadius: 4, textTransform: "uppercase"
                }}>
                  {getStatusLabel(selectedEvent.status)}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginTop: 6, marginBottom: 0 }}>
                  {selectedEvent.title || "Publication sans titre"}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedEvent(null); setCopied(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", display: "flex", padding: 6, borderRadius: "50%"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-app)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, padding: 20, overflowY: "auto", flex: 1 }}>
              {/* Left column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Détails du Post
                  </label>
                  <div style={{ fontSize: 13, color: "var(--text-primary)" }}>
                    Client : <strong>{selectedEvent.client}</strong> <br />
                    Date : <strong>{selectedEvent.date} à {selectedEvent.time}</strong> <br />
                    Format : <strong>{selectedEvent.format}</strong>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Texte de Publication
                  </label>
                  <div style={{
                    padding: 14, borderRadius: 10, background: "var(--bg-app)",
                    border: "1px solid var(--border)", fontSize: 12.5,
                    color: "var(--text-primary)", whiteSpace: "pre-wrap",
                    lineHeight: 1.6, overflowY: "auto", maxHeight: 240
                  }}>
                    {selectedEvent.text} <br /><br />
                    <span style={{ color: selectedEvent.color }}>{selectedEvent.tags}</span>
                  </div>
                </div>
              </div>

              {/* Right column (mock feed container) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: 0, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>
                  Rendu visuel simulé ({selectedEvent.network})
                </label>

                {/* Simulated Feed card based on network */}
                {selectedEvent.network === "linkedin" && (
                  <div style={{
                    border: "1px solid #E5E7EB", borderRadius: 10, background: "white",
                    padding: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.03)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    textAlign: "left"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedEvent.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        {selectedEvent.client.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{selectedEvent.client}</div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>Sponsorisé · LinkedIn</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 11, color: "#1F2937", margin: "0 0 8px 0", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {selectedEvent.text} {selectedEvent.tags}
                    </p>
                    <div style={{ position: "relative", width: "100%", height: 150, borderRadius: 6, overflow: "hidden", background: "#F3F4F6", marginBottom: 8 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedEvent.mediaUrl} alt="LinkedIn preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #F3F4F6", paddingTop: 8, fontSize: 10, color: "#4B5563", fontWeight: 600 }}>
                      <span>👍 J'aime</span>
                      <span>💬 Commenter</span>
                      <span>🔁 Partager</span>
                      <span>🚀 Envoyer</span>
                    </div>
                  </div>
                )}

                {selectedEvent.network === "instagram" && (
                  <div style={{
                    border: "1px solid #E5E7EB", borderRadius: 10, background: "white",
                    padding: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.03)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", overflow: "hidden",
                    textAlign: "left"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: selectedEvent.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
                        {selectedEvent.client.slice(0, 2).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{selectedEvent.client}</div>
                    </div>
                    <div style={{ width: "100%", height: 180, background: "#F3F4F6" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedEvent.mediaUrl} alt="Instagram preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 10 }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 14 }}>
                        <span>❤️</span>
                        <span>💬</span>
                        <span>✈️</span>
                      </div>
                      <p style={{ fontSize: 10.5, color: "#1F2937", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        <strong>{selectedEvent.client.toLowerCase().replace(/\s/g, "")}</strong> {selectedEvent.text} {selectedEvent.tags}
                      </p>
                    </div>
                  </div>
                )}

                {selectedEvent.network !== "linkedin" && selectedEvent.network !== "instagram" && (
                  <div style={{
                    border: "1px solid #E5E7EB", borderRadius: 10, background: "white",
                    padding: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.03)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    textAlign: "left"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: selectedEvent.color }}>{networkIcons[selectedEvent.network]}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}>{selectedEvent.network}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#1F2937", margin: "0 0 8px 0", lineHeight: 1.4 }}>
                      {selectedEvent.text} {selectedEvent.tags}
                    </p>
                    <div style={{ width: "100%", height: 150, borderRadius: 6, overflow: "hidden", background: "#F3F4F6" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedEvent.mediaUrl} alt="social preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: "12px 20px", borderTop: "1px solid var(--border)",
              display: "flex", justifyContent: "flex-end", gap: 10,
              background: "var(--bg-subtle)"
            }}>
              <button
                onClick={() => { setSelectedEvent(null); setCopied(false); }}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border)",
                  background: "transparent", color: "var(--text-secondary)", fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", fontFamily: "var(--font-sans)"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedEvent.text}\n\n${selectedEvent.tags}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  padding: "8px 18px", borderRadius: 8, border: "none",
                  background: "var(--primary)", color: "white", fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-sans)"
                }}
              >
                {copied ? <Check size={13} /> : <Save size={13} />}
                <span>{copied ? "Copié !" : "Copier le texte"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
