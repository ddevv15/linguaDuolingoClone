import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserProgressState = {
  currentXP: number;
  dailyGoalXP: number;
  streak: number;
  completedLessons: string[];
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
};

export const useUserProgressStore = create<UserProgressState>()(
  persist(
    (set, get) => ({
      currentXP: 15,
      dailyGoalXP: 20,
      streak: 12,
      completedLessons: ["es-unit1-lesson1"],
      addXP: (amount) =>
        set({ currentXP: Math.min(get().currentXP + amount, get().dailyGoalXP) }),
      completeLesson: (lessonId) => {
        const { completedLessons } = get();
        if (!completedLessons.includes(lessonId)) {
          set({ completedLessons: [...completedLessons, lessonId] });
        }
      },
    }),
    {
      name: "user-progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
