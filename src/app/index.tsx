import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const colorSwatches = [
  { label: "Lingua Purple",      swatchClass: "w-14 h-14 rounded-xl bg-lingua-purple" },
  { label: "Lingua Deep Purple", swatchClass: "w-14 h-14 rounded-xl bg-lingua-deep-purple" },
  { label: "Lingua Blue",        swatchClass: "w-14 h-14 rounded-xl bg-lingua-blue" },
  { label: "Lingua Green",       swatchClass: "w-14 h-14 rounded-xl bg-lingua-green" },
  { label: "Warning",            swatchClass: "w-14 h-14 rounded-xl bg-warning" },
  { label: "Streak",             swatchClass: "w-14 h-14 rounded-xl bg-streak" },
  { label: "Error",              swatchClass: "w-14 h-14 rounded-xl bg-error" },
  { label: "Surface",            swatchClass: "w-14 h-14 rounded-xl bg-surface border border-border" },
];

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}>
        <Link href="/onboarding" asChild>
          <TouchableOpacity className="bg-lingua-purple rounded-2xl py-4 px-6 mb-6 flex-row items-center justify-between">
            <Text className="text-white text-body-md">Open Onboarding</Text>
            <Text className="text-white text-body-lg">›</Text>
          </TouchableOpacity>
        </Link>

        <Text className="text-h1 text-text-primary mb-1">Design System</Text>
        <Text className="text-body-md text-text-secondary mb-8">
          Lingua brand tokens — colors & typography
        </Text>

        <Text className="text-h3 text-text-primary mb-4">Colors</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {colorSwatches.map((s) => (
            <View key={s.label} className="items-center gap-1">
              <View className={s.swatchClass} />
              <Text className="text-caption text-text-secondary">{s.label}</Text>
            </View>
          ))}
        </View>

        <Text className="text-h3 text-text-primary mb-4">Typography</Text>
        <View className="gap-3">
          <Text className="text-h1 text-text-primary">H1 — Page Title</Text>
          <Text className="text-h2 text-text-primary">H2 — Section Title</Text>
          <Text className="text-h3 text-text-primary">H3 — Card Title</Text>
          <Text className="text-h4 text-text-primary">H4 — Subheading</Text>
          <Text className="text-body-lg text-text-primary">Body Large — Important content</Text>
          <Text className="text-body-md text-text-secondary">Body Medium — Body text</Text>
          <Text className="text-body-sm text-text-secondary">Body Small — Supporting text</Text>
          <Text className="text-caption text-text-secondary">Caption — Labels, meta text</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
