import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // ─── Spanish ─────────────────────────────────────────────────────────────
  {
    id: "es-unit-1",
    languageId: "es",
    title: "Getting Started",
    description: "Greetings, farewells, and essential everyday phrases.",
    order: 1,
    color: "#58CC02",
    icon: "👋",
    totalLessons: 2,
  },

  // ─── French ──────────────────────────────────────────────────────────────
  {
    id: "fr-unit-1",
    languageId: "fr",
    title: "Les Bases",
    description: "Basic greetings and common colors.",
    order: 1,
    color: "#1CB0F6",
    icon: "🌸",
    totalLessons: 2,
  },

  // ─── Japanese ────────────────────────────────────────────────────────────
  {
    id: "ja-unit-1",
    languageId: "ja",
    title: "はじめに (Introduction)",
    description: "Hiragana basics and essential Japanese greetings.",
    order: 1,
    color: "#FF4B4B",
    icon: "⛩️",
    totalLessons: 2,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units.filter((u) => u.languageId === languageId);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}
