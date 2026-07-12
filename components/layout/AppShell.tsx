"use client";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppStore } from "@/lib/store";

function ProgressBarComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  // Complete progress bar when path or query parameters change
  useEffect(() => {
    if (loading) {
      setProgress(100);
      setShowSpinner(false);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on relative anchors to start loading animation instantly
  useEffect(() => {
    let spinnerTimer: NodeJS.Timeout;

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        (!target || target === "_self") &&
        href !== pathname
      ) {
        setLoading(true);
        setProgress(15);
        setShowSpinner(false);

        // If loading takes longer than 200ms, show the blur spinner overlay
        spinnerTimer = setTimeout(() => {
          setShowSpinner(true);
        }, 200);
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("click", handleAnchorClick);
      clearTimeout(spinnerTimer);
    };
  }, [pathname]);

  // Gradually increase loading bar progress towards 85% while route resolves
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + (85 - prev) * 0.12;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <>
      {/* Top linear progress bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        background: "linear-gradient(90deg, #2563EB, #7C3AED)",
        width: `${progress}%`,
        zIndex: 99999,
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s",
        boxShadow: "0 0 8px rgba(37,99,235,0.45)"
      }} />

      {/* Glassmorphism Blur Spinner Overlay (For long loading times > 200ms) */}
      {showSpinner && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.12)",
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99998,
          animation: "fadeIn 0.2s ease-out",
          gap: 16
        }}>
          {/* Spinning Loader Ring */}
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3px solid rgba(37, 99, 235, 0.12)",
            borderTopColor: "#2563EB",
            animation: "spin 0.75s linear infinite",
            boxShadow: "0 0 15px rgba(37,99,235,0.15)"
          }} />
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            background: "var(--bg)",
            padding: "8px 18px",
            borderRadius: 99,
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-sans)"
          }}>
            Chargement de l'espace...
          </div>
        </div>
      )}
    </>
  );
}

function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarComponent />
    </Suspense>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-subtle)",
      }}
    >
      <ProgressBar />
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "24px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
