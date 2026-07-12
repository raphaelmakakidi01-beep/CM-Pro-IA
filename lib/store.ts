import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  activeClient: string | null;
  searchOpen: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  setActiveClient: (id: string | null) => void;
  setSearchOpen: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  theme: "light",
  activeClient: null,
  searchOpen: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return { theme: next };
    }),
  setActiveClient: (id) => set({ activeClient: id }),
  setSearchOpen: (v) => set({ searchOpen: v }),
}));
