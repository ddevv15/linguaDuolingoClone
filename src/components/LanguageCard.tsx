import { View, Text, Image, TouchableOpacity } from "react-native";
import type { Language } from "@/types/learning";

type Props = {
  language: Language;
  unitCount: number;
  lessonCount: number;
  onPress: () => void;
  selected: boolean;
};

export default function LanguageCard({
  language,
  unitCount,
  lessonCount,
  onPress,
  selected,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-2xl px-4 py-4 mb-3 border ${
        selected ? "border-primary bg-primary/5" : "border-border bg-white"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: language.flag }}
          style={{ width: 48, height: 34, borderRadius: 4 }}
          resizeMode="cover"
        />

        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-0.5">
            <Text
              className="text-body-md text-text-primary"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {language.name}
            </Text>
            <Text className="text-body-sm text-text-secondary">
              · {language.nativeName}
            </Text>
          </View>

          <Text className="text-body-sm text-text-secondary mb-2" numberOfLines={2}>
            {language.description}
          </Text>

          <View className="flex-row gap-2">
            <View className="bg-surface rounded-full px-2.5 py-0.5">
              <Text className="text-caption text-text-secondary">
                {unitCount} {unitCount === 1 ? "unit" : "units"}
              </Text>
            </View>
            <View className="bg-surface rounded-full px-2.5 py-0.5">
              <Text className="text-caption text-text-secondary">
                {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-body-lg text-text-secondary">
          {selected ? "✓" : "›"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
