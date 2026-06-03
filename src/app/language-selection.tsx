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
import { router } from "expo-router";

import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import type { Language } from "@/types/learning";
import { posthog } from "@/lib/posthog";

export default function LanguageSelectionScreen() {
  const { setLanguage } = useLanguageStore();
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
    setLanguage(selected);
    posthog.capture("language_selected", {
      language_id: selected.id,
      language_name: selected.name,
      language_code: selected.code,
    });
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        {router.canGoBack() ? (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButton}
          >
            <Text style={styles.backChevron}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text style={styles.headerTitle}>Choose a language</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
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
        <Text style={styles.sectionLabel}>Popular</Text>

        {filtered.map((lang) => {
          const isSelected = selected?.id === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              onPress={() =>
                setSelected((prev) => (prev?.id === lang.id ? null : lang))
              }
              activeOpacity={0.7}
              style={[styles.row, isSelected && styles.rowSelected]}
            >
              <Image
                source={{ uri: lang.flag }}
                style={styles.flagImage}
                contentFit="cover"
              />

              <View style={styles.rowText}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.learnerCount}>{lang.learnerCount}</Text>
              </View>

              {isSelected ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <Text style={styles.chevron}>›</Text>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Confirmation / continue button */}
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.8}
          style={[styles.continueButton, selected && styles.continueButtonActive]}
        >
          <Text style={[styles.continueLabel, selected && styles.continueLabelActive]}>
            {selected ? `Continue with ${selected.name}` : "Select a language"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
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
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
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
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    lineHeight: 22,
    color: "#001132",
  },
  row: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  rowSelected: {
    borderColor: "#6C4EF5",
    backgroundColor: "rgba(108, 78, 245, 0.05)",
  },
  flagImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
  },
  langName: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
  learnerCount: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  chevron: {
    fontSize: 18,
    lineHeight: 26,
    color: "#6B7280",
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
  continueButton: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  continueButtonActive: {
    backgroundColor: "#6C4EF5",
    borderColor: "#6C4EF5",
  },
  continueLabel: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#6B7280",
  },
  continueLabelActive: {
    color: "#FFFFFF",
  },
});
