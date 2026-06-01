import "../../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@/lib/clerk";
import { Stack, useRouter, useSegments, usePathname, useGlobalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";

import { useLanguageStore } from "@/store/languageStore";
import { posthog } from "@/lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// ── Screen tracking ───────────────────────────────────────────────
function ScreenTracker() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  return null;
}

// ── Auth + language routing guard ─────────────────────────────────
// Lives inside ClerkProvider so it can call useAuth().
// Authenticated users without a selected language are sent to
// /language-selection before they can access the tab navigator.
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { selectedLanguage, hasHydrated } = useLanguageStore();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      if (fontError) console.warn("Font load failed:", fontError);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    // Wait for Clerk, fonts, AND the Zustand store to finish loading from AsyncStorage
    if (!isLoaded || !hasHydrated || (!fontsLoaded && !fontError)) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const onOnboarding = segments[0] === "onboarding";
    const onLanguageSelection = segments[0] === "language-selection";

    if (isSignedIn) {
      if (!selectedLanguage && !onLanguageSelection) {
        // Signed-in but no language chosen yet — must pick one first
        router.replace("/language-selection");
      } else if (selectedLanguage && !inTabsGroup) {
        // Language is set — send to home tabs
        router.replace("/(tabs)");
      }
    } else if (!inAuthGroup && !onOnboarding && !inTabsGroup) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, segments, fontsLoaded, fontError, selectedLanguage, hasHydrated]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <ScreenTracker />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="language-selection" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

// ── Root layout ───────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ["testID"],
        maxElementsCaptured: 20,
      }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </PostHogProvider>
  );
}
