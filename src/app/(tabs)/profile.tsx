import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUser, useAuth } from "@clerk/expo";

import { useLanguageStore } from "@/store/languageStore";
import { useUserProgressStore } from "@/store/userProgressStore";

type SettingsRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

function SettingsRow({ icon, iconBg, label, onPress, danger }: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.settingsRow}
    >
      <View style={[styles.settingsIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color="#FFFFFF" />
      </View>
      <Text
        style={[
          styles.settingsLabel,
          danger && { color: "#FF3B30" },
        ]}
      >
        {label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={danger ? "#FF3B30" : "#9CA3AF"}
      />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { selectedLanguage } = useLanguageStore();
  const { currentXP, streak, completedLessons, dailyGoalXP } = useUserProgressStore();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName ?? user?.primaryEmailAddress?.emailAddress?.split("@")[0] ?? "Learner";

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const avatarUrl = user?.imageUrl;

  function handleSignOut() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Header ─────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* ── Avatar + Name ──────────────────────────── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Ionicons name="person" size={36} color="#FFFFFF" />
              </View>
            )}
            <View style={styles.avatarBadge}>
              <Ionicons name="star" size={10} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.displayName}>{displayName}</Text>
          {email ? (
            <Text style={styles.email}>{email}</Text>
          ) : null}
        </View>

        {/* ── Stats Row ──────────────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentXP}</Text>
            <Text style={styles.statLabel}>XP today</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={{ fontSize: 16 }}>🔥</Text>
            </View>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedLessons.length}</Text>
            <Text style={styles.statLabel}>Lessons done</Text>
          </View>
        </View>

        {/* ── Daily Goal Progress ─────────────────────── */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Daily goal</Text>
            <Text style={styles.dailyGoalXP}>{currentXP} / {dailyGoalXP} XP</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((currentXP / dailyGoalXP) * 100, 100)}%` },
              ]}
            />
          </View>
        </View>

        {/* ── Currently Learning ─────────────────────── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Currently learning</Text>
          {selectedLanguage ? (
            <View style={styles.languageRow}>
              <Image
                source={{ uri: selectedLanguage.flag }}
                style={styles.flagImage}
                contentFit="cover"
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.languageName}>{selectedLanguage.name}</Text>
                <Text style={styles.languageSub}>{selectedLanguage.nativeName}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/language-selection")}
                activeOpacity={0.7}
                style={styles.changeLangButton}
              >
                <Text style={styles.changeLangText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/language-selection")}
              activeOpacity={0.7}
              style={styles.selectLangButton}
            >
              <Ionicons name="earth-outline" size={18} color="#6C4EF5" />
              <Text style={styles.selectLangText}>Select a language</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Settings ───────────────────────────────── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <SettingsRow
            icon="language-outline"
            iconBg="#6C4EF5"
            label="Change language"
            onPress={() => router.push("/language-selection")}
          />
          <SettingsRow
            icon="notifications-outline"
            iconBg="#4D88FF"
            label="Notifications"
            onPress={() => {}}
          />
          <SettingsRow
            icon="help-circle-outline"
            iconBg="#21C16B"
            label="Help & Support"
            onPress={() => {}}
          />
          <SettingsRow
            icon="log-out-outline"
            iconBg="#FF3B30"
            label="Sign out"
            onPress={handleSignOut}
            danger
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#001132",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: "#6C4EF5",
  },
  avatarFallback: {
    backgroundColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FF8A00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  displayName: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#001132",
    lineHeight: 28,
  },
  email: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#F6F7FB",
    borderRadius: 16,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#001132",
    lineHeight: 30,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginTop: 2,
    lineHeight: 15,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#F6F7FB",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#6B7280",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dailyGoalXP: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#FF8A00",
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  languageName: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
    lineHeight: 22,
  },
  languageSub: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    lineHeight: 16,
  },
  changeLangButton: {
    backgroundColor: "#6C4EF5",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  changeLangText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  selectLangButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  selectLangText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingsIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#001132",
  },
});
