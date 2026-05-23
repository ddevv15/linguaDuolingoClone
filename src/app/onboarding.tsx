import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { images } from "@/constants/images";

function SpeechBubble({ text, textColor }: { text: string; textColor: string }) {
  return (
    <View className="bg-white rounded-xl px-3 py-2 border border-border" style={styles.shadow}>
      <Text className="text-body-sm" style={{ fontFamily: "Poppins-SemiBold", color: textColor }}>
        {text}
      </Text>
    </View>
  );
}

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Logo row */}
      <View className="flex-row items-center justify-center gap-2 pt-4">
        <Image source={images.mascotLogo} className="w-[38px] h-[38px]" contentFit="contain" />
        <Text className="text-h3 text-text-primary">muolingo</Text>
      </View>

      {/* Hero text */}
      <View className="px-6 mt-10">
        <Text className="text-h1 text-text-primary">Your AI language</Text>
        <Text className="text-h1">
          <Text className="text-lingua-purple">teacher</Text>
          <Text className="text-text-primary">.</Text>
        </Text>
        <Text className="text-body-md text-text-secondary mt-3">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + speech bubbles */}
      <View className="flex-1 items-center justify-center">
        <View className="w-[280px] h-[310px]">
          <Image source={images.mascotWelcome} className="w-full h-full" contentFit="contain" />

          {/* Hello! — lower left */}
          <View className="absolute" style={{ left: -18, bottom: 115 }}>
            <SpeechBubble text="Hello!" textColor="#001132" />
          </View>

          {/* ¡Hola! — upper right */}
          <View className="absolute" style={{ right: -28, top: 30 }}>
            <SpeechBubble text="¡Hola!" textColor="#6C4EF5" />
          </View>

          {/* 你好! — lower right */}
          <View className="absolute" style={{ right: -18, bottom: 55 }}>
            <SpeechBubble text="你好!" textColor="#FF4D4F" />
          </View>
        </View>
      </View>

      {/* Get Started button */}
      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={() => router.replace("/")}
          activeOpacity={0.85}
          className="bg-lingua-purple rounded-2xl overflow-hidden"
        >
          <View className="flex-row items-center justify-center py-[18px] px-6">
            <Text className="text-white text-body-lg">Get Started</Text>
            <Text
              className="absolute right-6 text-white text-[22px]"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              ›
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});
