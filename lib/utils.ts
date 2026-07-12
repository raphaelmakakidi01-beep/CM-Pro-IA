import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "text-emerald-600 bg-emerald-50",
    paused: "text-amber-600 bg-amber-50",
    review: "text-blue-600 bg-blue-50",
    published: "text-emerald-600 bg-emerald-50",
    scheduled: "text-blue-600 bg-blue-50",
    draft: "text-gray-500 bg-gray-100",
    paid: "text-emerald-600 bg-emerald-50",
    pending: "text-amber-600 bg-amber-50",
    overdue: "text-red-600 bg-red-50",
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-gray-400",
  };
  return map[status] || "text-gray-500 bg-gray-100";
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    active: "Actif",
    paused: "En pause",
    review: "En révision",
    published: "Publié",
    scheduled: "Programmé",
    draft: "Brouillon",
    paid: "Payée",
    pending: "En attente",
    overdue: "En retard",
    online: "En ligne",
    away: "Absent",
    offline: "Hors ligne",
  };
  return map[status] || status;
}
