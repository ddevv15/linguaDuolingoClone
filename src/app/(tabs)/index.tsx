import { type ComponentProps } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useLanguageStore } from "@/store/languageStore";
import { useUserProgressStore } from "@/store/userProgressStore";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const LANGUAGE_GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  ko: "안녕하세요",
  de: "Hallo",
  zh: "你好",
};

type PlanItem = {
  id: string;
  title: string;
  subtitle: string;
  iconName: IoniconName;
  iconBg: string;
  completed: boolean;
};

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { currentXP, dailyGoalXP, streak, completedLessons } = useUserProgressStore();

  const displayName =
    user?.firstName ??
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ??
    "Learner";

  const greeting = selectedLanguage
    ? (LANGUAGE_GREETINGS[selectedLanguage.code] ?? "Hello")
    : "Hello";

  const units = selectedLanguage ? getUnitsByLanguage(selectedLanguage.id) : [];
  const currentUnit = units[0];
  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const currentLesson = lessons[0];

  const xpProgress = Math.min((currentXP / dailyGoalXP) * 100, 100);

  const todaysPlan: PlanItem[] = [
    {
      id: "lesson",
      title: currentLesson?.title ?? "Lesson",
      subtitle: currentLesson?.description ?? "",
      iconName: "book-outline",
      iconBg: "#6C4EF5",
      completed: completedLessons.includes(currentLesson?.id ?? ""),
    },
    {
      id: "ai-conversation",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      iconName: "headset-outline",
      iconBg: "#4D88FF",
      completed: false,
    },
    {
      id: "new-words",
      title: "New words",
      subtitle: `${currentLesson?.goal.targetWords ?? 10} words`,
      iconName: "text-outline",
      iconBg: "#FF6B6B",
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-2">
            {selectedLanguage ? (
              <Image
                source={{ uri: selectedLanguage.flag }}
                className="w-9 h-9 rounded-full"
                contentFit="cover"
              />
            ) : null}
            <Text className="text-h4 text-text-primary">
              {greeting}, {displayName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                className="w-5 h-5"
                contentFit="contain"
              />
              <Text
                className="text-body-md text-streak"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                {streak}
              </Text>
            </View>
            <Ionicons name="notifications-outline" size={22} color="#001132" />
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────────────── */}
        <View className="mx-5 mb-4 rounded-2xl px-5 py-4 flex-row items-center justify-between bg-[#FEF9F0]">
          <View className="flex-1">
            <Text className="text-caption text-text-secondary mb-1">Daily goal</Text>
            <Text className="text-h2 text-text-primary">
              {currentXP} / {dailyGoalXP} XP
            </Text>
            <View className="mt-2 h-2 w-40 rounded-full bg-border overflow-hidden">
              <View
                className="h-full rounded-full bg-streak"
                style={{ width: `${xpProgress}%` }}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            className="w-[84px] h-[84px]"
            contentFit="contain"
          />
        </View>

        {/* ── Continue Learning Card ──────────────────────── */}
        {selectedLanguage && currentUnit ? (
          <View className="mx-5 mb-5 min-h-[160px] rounded-3xl overflow-hidden bg-lingua-purple">
            <View className="px-5 pt-5 pb-5" style={{ zIndex: 1 }}>
              <Text
                className="text-caption mb-1"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Continue learning
              </Text>
              <Text className="text-h2 text-white">
                {selectedLanguage.name}
              </Text>
              <Text
                className="text-body-sm mt-1"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                A1 · Unit {currentUnit.order}
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                className="bg-white rounded-2xl self-start mt-4 px-5"
                style={{ paddingVertical: 8 }}
                onPress={() => {
                  posthog.capture("continue_learning_tapped", {
                    language: selectedLanguage?.name,
                    unit_id: currentUnit?.id,
                    lesson_id: currentLesson?.id,
                  });
                  if (currentLesson) router.push(`/lesson/${currentLesson.id}`);
                }}
              >
                <Text
                  className="text-lingua-purple text-body-sm"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={images.palace}
              className="absolute -right-1 bottom-0 w-[140px] h-[168px]"
              contentFit="contain"
            />
          </View>
        ) : null}

        {/* ── Today's Plan ────────────────────────────────── */}
        <View className="mx-5 mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-h4 text-text-primary">{"Today's plan"}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                className="text-body-sm text-lingua-purple"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {todaysPlan.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center bg-surface rounded-2xl px-4 py-3 mb-2"
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center"
                style={{ backgroundColor: item.iconBg }}
              >
                <Ionicons name={item.iconName} size={20} color="#FFFFFF" />
              </View>

              <View className="flex-1 ml-3">
                <Text
                  className="text-body-md text-text-primary"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  {item.title}
                </Text>
                <Text className="text-caption text-text-secondary">
                  {item.subtitle}
                </Text>
              </View>

              <View
                className="w-6 h-6 rounded-full items-center justify-center"
                style={
                  item.completed
                    ? { backgroundColor: "#4D88FF", borderWidth: 0 }
                    : { backgroundColor: "transparent", borderWidth: 2, borderColor: "#E5E7EB" }
                }
              >
                {item.completed ? (
                  <Ionicons name="checkmark" size={13} color="white" />
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* ── Next Up Card ─────────────────────────────────── */}
        <View className="mx-5 mb-6 bg-surface rounded-2xl px-4 py-4 flex-row items-center">
          <View className="flex-1">
            <Text className="text-caption text-text-secondary mb-0.5">
              Next up
            </Text>
            <Text
              className="text-body-md text-text-primary"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              AI Video Call
            </Text>
            <Text className="text-caption text-text-secondary">
              Practice speaking
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=47" }}
              className="w-12 h-12 rounded-full"
              contentFit="cover"
            />
            <View className="w-10 h-10 rounded-full bg-lingua-green items-center justify-center">
              <Ionicons name="videocam" size={18} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
