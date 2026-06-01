import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useLanguageStore } from "@/store/languageStore";
import { useUserProgressStore } from "@/store/userProgressStore";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import type { Lesson } from "@/types/learning";
import { posthog } from "@/lib/posthog";

type LessonStatus = "completed" | "in_progress" | "available";

function getLessonStatus(
  lessonId: string,
  lessonIndex: number,
  allLessons: Lesson[],
  completedLessons: string[]
): LessonStatus {
  if (completedLessons.includes(lessonId)) return "completed";
  const firstIncomplete = allLessons.findIndex((l) => !completedLessons.includes(l.id));
  if (firstIncomplete !== -1 && lessonIndex === firstIncomplete) return "in_progress";
  return "available";
}

export default function LearnScreen() {
  const { selectedLanguage } = useLanguageStore();
  const { completedLessons } = useUserProgressStore();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  const units = selectedLanguage ? getUnitsByLanguage(selectedLanguage.id) : [];
  const currentUnit = units[0];
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];

  const completedCount = lessons.filter((l) => completedLessons.includes(l.id)).length;

  if (!selectedLanguage || !currentUnit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
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
            <Ionicons name="earth-outline" size={32} color="#6C4EF5" />
          </View>
          <Text
            className="text-h3 text-text-primary text-center"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            No language selected
          </Text>
          <Text className="text-body-md text-text-secondary text-center mt-2">
            Go to your profile to select a language to learn.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Unit Banner ──────────────────────────────── */}
        <View
          style={[
            styles.unitBanner,
            { backgroundColor: currentUnit.color },
          ]}
        >
          {/* Header row: title + bookmark */}
          <View className="px-5 pt-5 flex-row items-start justify-between">
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text
                className="text-h2 text-white"
                style={{ fontFamily: "Poppins-Bold" }}
                numberOfLines={2}
              >
                {currentUnit.icon} {currentUnit.title}
              </Text>
              <Text
                className="text-body-sm mt-1"
                style={{ color: "rgba(255,255,255,0.80)", fontFamily: "Poppins-Regular" }}
              >
                Unit {currentUnit.order} · {completedCount}/{lessons.length} lessons
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 4 }}>
              <Ionicons
                name="bookmark-outline"
                size={22}
                color="rgba(255,255,255,0.90)"
              />
            </TouchableOpacity>
          </View>

          {/* Spacer so the mascot image has room */}
          <View style={{ height: 140 }} />

          {/* Mascot illustration — absolute positioned bottom-right */}
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            contentFit="contain"
          />

          {/* Semi-transparent decorative circle */}
          <View style={styles.decorCircle} />
        </View>

        {/* ── Tab Switcher ─────────────────────────────── */}
        <View style={styles.tabBar}>
          {(["lessons", "practice"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabItem}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? "#6C4EF5" : "#6B7280",
                      fontFamily: isActive ? "Poppins-SemiBold" : "Poppins-Regular",
                    },
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
                {isActive && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Lessons Tab ──────────────────────────────── */}
        {activeTab === "lessons" ? (
          <View style={{ backgroundColor: "#FFFFFF" }}>
            {lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson.id, index, lessons, completedLessons);
              const isInProgress = status === "in_progress";
              const imageUrl = `https://picsum.photos/seed/${lesson.id}/200/200`;

              return (
                <TouchableOpacity
                  key={lesson.id}
                  activeOpacity={0.7}
                  style={[
                    styles.lessonRow,
                    isInProgress && styles.lessonRowInProgress,
                  ]}
                  onPress={() =>
                    posthog.capture("lesson_tapped", {
                      lesson_id: lesson.id,
                      lesson_title: lesson.title,
                      lesson_order: lesson.order,
                      lesson_status: status,
                      unit_id: currentUnit.id,
                    })
                  }
                >
                  {/* Lesson number */}
                  <View style={styles.lessonNumberWrapper}>
                    <Text style={styles.lessonNumber}>Lesson {lesson.order}</Text>
                  </View>

                  {/* Title and meta */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.lessonTitle,
                        isInProgress && { color: "#6C4EF5" },
                      ]}
                      numberOfLines={1}
                    >
                      {lesson.title}
                    </Text>
                    <Text style={styles.lessonMeta}>
                      {lesson.xpReward} XP · {lesson.estimatedMinutes} min
                    </Text>
                  </View>

                  {/* Status indicator */}
                  {status === "completed" && (
                    <View style={styles.statusCompleted}>
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    </View>
                  )}

                  {status === "in_progress" && (
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.lessonImage}
                      contentFit="cover"
                    />
                  )}

                  {status === "available" && (
                    <View style={styles.statusAvailable}>
                      <Ionicons name="play" size={14} color="#9CA3AF" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}

            {/* Completion badge if all done */}
            {completedCount === lessons.length && lessons.length > 0 && (
              <View style={styles.allCompletedBanner}>
                <Ionicons name="trophy" size={20} color="#FF8A00" />
                <Text style={styles.allCompletedText}>
                  Unit complete! Keep going 🎉
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* ── Practice Tab (placeholder) ─────────────── */
          <View style={styles.practicePlaceholder}>
            <View style={styles.practiceIcon}>
              <Ionicons name="barbell-outline" size={28} color="#6C4EF5" />
            </View>
            <Text
              className="text-h4 text-text-primary text-center"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Practice
            </Text>
            <Text className="text-body-sm text-text-secondary text-center mt-2">
              Practice exercises are coming soon.{"\n"}Finish more lessons to unlock.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  unitBanner: {
    overflow: "hidden",
    position: "relative",
  },
  mascotImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 150,
    height: 170,
  },
  decorCircle: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    position: "relative",
  },
  tabText: {
    fontSize: 14,
    lineHeight: 22,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    width: 48,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#6C4EF5",
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  lessonRowInProgress: {
    backgroundColor: "rgba(108, 78, 245, 0.06)",
  },
  lessonNumberWrapper: {
    width: 64,
  },
  lessonNumber: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  lessonTitle: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
  lessonMeta: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
    marginTop: 2,
  },
  statusCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#21C16B",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  statusAvailable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F7FB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  allCompletedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "#FEF9F0",
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
  },
  allCompletedText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#FF8A00",
  },
  practicePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  practiceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0ECFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
