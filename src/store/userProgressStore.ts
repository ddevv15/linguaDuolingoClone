import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { posthog } from "@/lib/posthog";

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
      addXP: (amount) => {
        const { currentXP, dailyGoalXP } = get();
        const newXP = Math.min(currentXP + amount, dailyGoalXP);
        posthog.capture("xp_earned", { amount, total_xp: newXP, daily_goal: dailyGoalXP });
        if (currentXP < dailyGoalXP && newXP >= dailyGoalXP) {
          posthog.capture("daily_goal_reached", { daily_goal_xp: dailyGoalXP });
        }
        set({ currentXP: newXP });
      },
      completeLesson: (lessonId) => {
        const { completedLessons } = get();
        if (!completedLessons.includes(lessonId)) {
          posthog.capture("lesson_completed", {
            lesson_id: lessonId,
            total_lessons_completed: completedLessons.length + 1,
          });
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
