import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { posthog } from "@/lib/posthog";

export default function AITeacherScreen() {
  useEffect(() => {
    posthog.capture("ai_teacher_opened");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-h3 text-text-primary" style={{ fontFamily: "Poppins-SemiBold" }}>
          AI Teacher
        </Text>
      </View>
    </SafeAreaView>
  );
}
