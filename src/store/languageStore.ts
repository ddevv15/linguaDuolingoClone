import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Language } from "@/types/learning";

type LanguageState = {
  selectedLanguage: Language | null;
  hasHydrated: boolean;
  setLanguage: (lang: Language) => void;
  clearLanguage: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setLanguage: (lang) => set({ selectedLanguage: lang }),
      clearLanguage: () => set({ selectedLanguage: null }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the language selection, not the hydration flag
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) console.warn("Failed to rehydrate language store:", error);
        useLanguageStore.setState({ hasHydrated: true });
      },
    }
  )
);
