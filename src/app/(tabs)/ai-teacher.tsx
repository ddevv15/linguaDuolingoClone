import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useLanguageStore } from "@/store/languageStore";
import { useUserProgressStore } from "@/store/userProgressStore";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import type { Language, Lesson } from "@/types/learning";

function getCurrentLesson(
  selectedLanguage: Language | null,
  completedLessons: string[]
): Lesson | null {
  if (!selectedLanguage) return null;
  const units = getUnitsByLanguage(selectedLanguage.id);
  const unit = units[0];
  if (!unit) return null;
  const lessons = getLessonsByUnit(unit.id);
  if (!lessons.length) return null;
  return lessons.find((l) => !completedLessons.includes(l.id)) ?? lessons[0];
}

export default function AITeacherScreen() {
  const { selectedLanguage } = useLanguageStore();
  const { completedLessons } = useUserProgressStore();

  const lesson = getCurrentLesson(selectedLanguage, completedLessons);

  if (!lesson) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        edges={["top"]}
      >
        <View className="flex-1 items-center justify-center px-8">
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: "#F0ECFE",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Ionicons name="mic-outline" size={32} color="#6C4EF5" />
          </View>
          <Text
            className="text-h3 text-text-primary text-center"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            No lessons available
          </Text>
          <Text className="text-body-md text-text-secondary text-center mt-2">
            Select a language in your profile to start learning.
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/learn")}
            activeOpacity={0.7}
            style={{
              marginTop: 20,
              backgroundColor: "#6C4EF5",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontFamily: "Poppins-SemiBold",
                fontSize: 14,
              }}
            >
              Go to Lessons
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // The AI Teacher tab is just an entry point — the lesson screen owns Stream
  // setup (`<StreamVideo>`/`<StreamCall>`) so `AudioLessonView`'s call hooks
  // have a context to read from. Hand off to it instead of rendering here.
  return <Redirect href={`/lesson/${lesson.id}`} />;
}
