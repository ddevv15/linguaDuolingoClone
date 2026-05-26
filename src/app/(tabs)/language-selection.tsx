import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";

import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import type { Language } from "@/types/learning";

export default function LanguageSelectionScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Language | null>(null);

  const filtered = languages.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q)
    );
  });

  function handleContinue() {
    if (!selected) return;
    router.push("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center text-text-primary" style={styles.headerTitle}>
          Choose a language
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search bar */}
      <View
        className="mx-4 mb-5 flex-row items-center bg-surface rounded-2xl px-4 gap-3"
        style={styles.searchContainer}
      >
        <SymbolView name="magnifyingglass" size={16} tintColor="#9CA3AF" />
        <TextInput
          placeholder="Search languages"
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Scrollable language list */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text className="px-4 mb-3 text-text-primary" style={styles.sectionLabel}>
          Popular
        </Text>

        {filtered.map((lang) => {
          const isSelected = selected?.id === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              onPress={() =>
                setSelected((prev) => (prev?.id === lang.id ? null : lang))
              }
              activeOpacity={0.7}
              className={`mx-4 mb-2 flex-row items-center px-4 py-3 rounded-2xl border ${
                isSelected ? "border-lingua-purple" : "border-border bg-white"
              }`}
              style={isSelected ? styles.rowSelected : undefined}
            >
              <Image
                source={{ uri: lang.flag }}
                style={styles.flagImage}
                contentFit="cover"
              />

              <View className="flex-1 ml-3">
                <Text className="text-text-primary" style={styles.langName}>
                  {lang.name}
                </Text>
                <Text className="text-text-secondary text-body-sm">
                  {lang.learnerCount}
                </Text>
              </View>

              {isSelected ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <Text className="text-text-secondary" style={styles.chevron}>
                  ›
                </Text>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Confirmation / continue button */}
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.8}
          className={`mx-4 mt-3 rounded-2xl py-4 items-center ${
            selected ? "bg-lingua-purple" : "bg-surface border border-border"
          }`}
        >
          <Text
            className={selected ? "text-white" : "text-text-secondary"}
            style={styles.continueLabel}
          >
            {selected ? `Continue with ${selected.name}` : "Select a language"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Earth illustration pinned to the bottom — bleeds to screen edge */}
      <Image
        source={images.earth}
        style={styles.earthImage}
        contentFit="cover"
        contentPosition="top"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    width: 40,
  },
  backChevron: {
    fontSize: 28,
    lineHeight: 32,
    color: "#001132",
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#001132",
    paddingVertical: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 22,
  },
  rowSelected: {
    backgroundColor: "rgba(108, 78, 245, 0.05)",
  },
  flagImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  langName: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
  },
  chevron: {
    fontSize: 18,
    lineHeight: 26,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
  },
  continueLabel: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
  },
  earthImage: {
    width: "100%",
    height: 200,
  },
});
