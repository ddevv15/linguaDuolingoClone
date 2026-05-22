import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorSwatches = [
  { label: "Lingua Purple", className: "bg-lingua-purple" },
  { label: "Lingua Deep Purple", className: "bg-lingua-deep-purple" },
  { label: "Lingua Blue", className: "bg-lingua-blue" },
  { label: "Lingua Green", className: "bg-lingua-green" },
  { label: "Warning", className: "bg-warning" },
  { label: "Streak", className: "bg-streak" },
  { label: "Error", className: "bg-error" },
  { label: "Surface", className: "bg-surface border border-border" },
];

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView className="flex-1 px-5 py-6">
        <Text className="text-h1 text-text-primary mb-1">Design System</Text>
        <Text className="text-body-md text-text-secondary mb-8">
          Lingua brand tokens — colors &amp; typography
        </Text>

        <Text className="text-h3 text-text-primary mb-4">Colors</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {colorSwatches.map((s) => (
            <View key={s.label} className="items-center gap-1">
              <View className={`w-14 h-14 rounded-xl ${s.className}`} />
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
