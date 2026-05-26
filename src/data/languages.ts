import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: `https://flagcdn.com/w320/es.png`,
    description: "The second most spoken language in the world.",
    totalUnits: 1,
    learnerCount: "28.4M learners",
  },
  {
    id: "fr",
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description: "The language of art, cuisine, and diplomacy.",
    totalUnits: 1,
    learnerCount: "19.4M learners",
  },
  {
    id: "ja",
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    description: "A rich language with a unique writing system.",
    totalUnits: 1,
    learnerCount: "12.7M learners",
  },
  {
    id: "ko",
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "https://flagcdn.com/w320/kr.png",
    description: "The language of K-pop, K-dramas, and Korean culture.",
    totalUnits: 1,
    learnerCount: "9.3M learners",
  },
  {
    id: "de",
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description: "The most widely spoken language in Central Europe.",
    totalUnits: 1,
    learnerCount: "8.1M learners",
  },
  {
    id: "zh",
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "https://flagcdn.com/w320/cn.png",
    description: "The most spoken language in the world by native speakers.",
    totalUnits: 1,
    learnerCount: "7.4M learners",
  },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((l) => l.id === id);
}
