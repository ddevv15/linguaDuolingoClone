import "../../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@/lib/clerk";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// ── Auth routing guard ────────────────────────────────────────────
// Lives inside ClerkProvider so it can call useAuth().
// Redirects unauthenticated users to /onboarding and authenticated
// users away from auth/onboarding screens to /.
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
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
    if (!isLoaded || (!fontsLoaded && !fontError)) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const onOnboarding = segments[0] === "onboarding";

    if (isSignedIn && !inTabsGroup) {
      // Signed-in users always belong in tabs — handles initial load,
      // post-auth redirect, and any stray route.
      router.replace("/(tabs)");
    } else if (!isSignedIn && !inAuthGroup && !onOnboarding && !inTabsGroup) {
      // Unauthenticated users go to onboarding unless they're already in
      // the auth flow. inTabsGroup guard prevents a redirect race while
      // the session is still activating after OAuth / OTP finalize.
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, segments, fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack />;
}

// ── Root layout ───────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
