import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useAuth } from "@clerk/expo";

import LanguageCard from "@/components/LanguageCard";
import { languages } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import type { Language } from "@/types/learning";

function getLessonCount(languageId: string): number {
  return getUnitsByLanguage(languageId).reduce(
    (sum, unit) => sum + getLessonsByUnit(unit.id).length,
    0
  );
}

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const selectedUnits = selectedLanguage
    ? getUnitsByLanguage(selectedLanguage.id)
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-h2 text-text-primary mb-1"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Learn a Language
          </Text>
          <Text className="text-body-sm text-text-secondary">
            Tap a language to explore its lessons.
          </Text>
        </View>

        {/* Language cards */}
        {languages.map((lang) => (
          <LanguageCard
            key={lang.id}
            language={lang}
            unitCount={getUnitsByLanguage(lang.id).length}
            lessonCount={getLessonCount(lang.id)}
            selected={selectedLanguage?.id === lang.id}
            onPress={() =>
              setSelectedLanguage((prev) =>
                prev?.id === lang.id ? null : lang
              )
            }
          />
        ))}

        {/* Expanded unit + lesson preview */}
        {selectedLanguage && selectedUnits.length > 0 && (
          <View className="mt-4">
            <View className="flex-row items-center gap-2 mb-3">
              <Image
                source={{ uri: selectedLanguage.flag }}
                style={{ width: 24, height: 24, borderRadius: 12 }}
                contentFit="cover"
              />
              <Text
                className="text-body-md text-text-primary"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                {selectedLanguage.name} · Units & Lessons
              </Text>
            </View>

            {selectedUnits.map((unit) => {
              const unitLessons = getLessonsByUnit(unit.id);
              return (
                <View
                  key={unit.id}
                  className="rounded-2xl border border-border bg-surface mb-3 overflow-hidden"
                >
                  {/* Unit header */}
                  <View
                    className="px-4 py-3 flex-row items-center gap-3"
                    style={{ backgroundColor: unit.color + "20" }}
                  >
                    <Text style={{ fontSize: 20 }}>{unit.icon}</Text>
                    <View className="flex-1">
                      <Text
                        className="text-body-sm text-text-primary"
                        style={{ fontFamily: "Poppins-SemiBold" }}
                      >
                        {unit.title}
                      </Text>
                      <Text className="text-caption text-text-secondary">
                        {unit.description}
                      </Text>
                    </View>
                  </View>

                  {/* Lessons */}
                  {unitLessons.map((lesson, idx) => (
                    <View
                      key={lesson.id}
                      className={`px-4 py-3 flex-row items-center gap-3 ${
                        idx < unitLessons.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <View
                        className="w-8 h-8 rounded-full items-center justify-center"
                        style={{ backgroundColor: unit.color + "25" }}
                      >
                        <Text className="text-caption" style={{ color: unit.color }}>
                          {lesson.order}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-body-sm text-text-primary"
                          style={{ fontFamily: "Poppins-SemiBold" }}
                        >
                          {lesson.title}
                        </Text>
                        <Text className="text-caption text-text-secondary">
                          {lesson.estimatedMinutes} min · +{lesson.xpReward} XP
                        </Text>
                      </View>
                      <Text className="text-caption text-text-secondary uppercase">
                        {lesson.type}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {/* Sign out */}
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.8}
          className="mt-6 border border-border rounded-2xl py-3 items-center"
        >
          <Text
            className="text-body-sm text-text-secondary"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
