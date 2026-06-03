import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // ─── Spanish ─────────────────────────────────────────────────────────────
  {
    id: "es-unit-1",
    languageId: "es",
    title: "Getting Started",
    description: "Greetings, farewells, numbers, colors, and everyday phrases.",
    order: 1,
    color: "#58CC02",
    icon: "👋",
    totalLessons: 6,
  },

  // ─── French ──────────────────────────────────────────────────────────────
  {
    id: "fr-unit-1",
    languageId: "fr",
    title: "Les Bases",
    description: "Greetings, colors, numbers, food, and family.",
    order: 1,
    color: "#1CB0F6",
    icon: "🌸",
    totalLessons: 6,
  },

  // ─── Japanese ────────────────────────────────────────────────────────────
  {
    id: "ja-unit-1",
    languageId: "ja",
    title: "はじめに (Introduction)",
    description: "Hiragana, greetings, numbers, days, colors, and family.",
    order: 1,
    color: "#FF4B4B",
    icon: "⛩️",
    totalLessons: 6,
  },

  // ─── Korean ──────────────────────────────────────────────────────────────
  {
    id: "ko-unit-1",
    languageId: "ko",
    title: "시작하기 (Getting Started)",
    description: "Greetings, numbers, colors, family, and food.",
    order: 1,
    color: "#FF6B35",
    icon: "🌿",
    totalLessons: 5,
  },

  // ─── German ──────────────────────────────────────────────────────────────
  {
    id: "de-unit-1",
    languageId: "de",
    title: "Anfänge (Getting Started)",
    description: "Greetings, numbers, colors, family, and food.",
    order: 1,
    color: "#4D88FF",
    icon: "🏰",
    totalLessons: 5,
  },

  // ─── Chinese ─────────────────────────────────────────────────────────────
  {
    id: "zh-unit-1",
    languageId: "zh",
    title: "开始学习 (Getting Started)",
    description: "Greetings, numbers, colors, family, and food.",
    order: 1,
    color: "#F6A623",
    icon: "🐉",
    totalLessons: 5,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units.filter((u) => u.languageId === languageId);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}
