import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSignIn, useSSO } from "@clerk/expo";
import { images } from "@/constants/images";
import AuthInputField from "@/components/AuthInputField";
import VerificationModal from "@/components/VerificationModal";
import { posthog } from "@/lib/posthog";

// Required so the OAuth browser session closes cleanly on return
WebBrowser.maybeCompleteAuthSession();

// ── Social auth icons ─────────────────────────────────────────────
function GoogleIcon() {
  return (
    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: "#4285F4" }}>
      G
    </Text>
  );
}

function FacebookIcon() {
  return (
    <View style={styles.fbCircle}>
      <Text style={styles.fbLetter}>f</Text>
    </View>
  );
}

function AppleIcon() {
  return (
    <View style={styles.appleCircle}>
      <Text style={styles.appleLetter}>A</Text>
    </View>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.socialBtn, styles.shadow]}
      onPress={onPress}
    >
      <View style={{ width: 28 }}>{icon}</View>
      <Text className="flex-1 text-center text-body-md text-text-primary">
        {label}
      </Text>
      <View style={{ width: 28 }} />
    </TouchableOpacity>
  );
}

// ── Screen ────────────────────────────────────────────────────────
export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const isLoading = fetchStatus === "fetching";

  // Email-code (OTP) sign-in — matches the existing UI which only collects email
  async function handleSignIn() {
    setError("");
    try {
      const { error: createError } = await signIn.create({ identifier: email });
      if (createError) {
        setError(createError.longMessage ?? createError.message);
        posthog.capture("sign_in_failed", { method: "email_otp", error: createError.message });
        return;
      }
      await signIn.emailCode.sendCode({ emailAddress: email });
      setModalVisible(true);
    } catch (e: any) {
      const msg = e?.errors?.[0]?.longMessage ?? e?.message ?? "Sign in failed.";
      setError(msg);
      posthog.capture("sign_in_failed", { method: "email_otp", error: msg });
    }
  }

  async function handleVerify(code: string) {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      const e: any = new Error(error.longMessage ?? error.message);
      e.errors = [error];
      posthog.capture("sign_in_failed", { method: "email_otp", error: error.message });
      throw e;
    }
    await signIn.finalize({
      navigate: () => {
        posthog.identify(email, {
          $set: { email },
          $set_once: { first_sign_in_date: new Date().toISOString() },
        });
        posthog.capture("sign_in_completed", { method: "email_otp" });
        setModalVisible(false);
        router.replace("/(tabs)");
      },
    });
  }

  async function handleResend() {
    await signIn.emailCode.sendCode({ emailAddress: email });
  }

  async function handleGoogleSignIn() {
    setError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("sign_in_completed", { method: "google" });
        router.replace("/");
      }
    } catch (e: any) {
      const msg = e?.message || "Google sign-in failed.";
      setError(msg);
      posthog.capture("sign_in_failed", { method: "google", error: msg });
    }
  }

  async function handleAppleSignIn() {
    setError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
        redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("sign_in_completed", { method: "apple" });
        router.replace("/");
      }
    } catch (e: any) {
      const msg = e?.message || "Apple sign-in failed.";
      setError(msg);
      posthog.capture("sign_in_failed", { method: "apple", error: msg });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="self-start px-5 pt-2 pb-1"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Header */}
        <View className="px-6 mt-4 mb-5">
          <Text className="text-h2 text-text-primary mb-1">Welcome back!</Text>
          <Text className="text-body-md text-text-secondary">
            Sign in to continue your journey ✨
          </Text>
        </View>

        {/* Mascot */}
        <View className="items-center mb-5">
          <Image
            source={images.mascotAuth}
            style={{ width: 160, height: 160 }}
            contentFit="contain"
          />
        </View>

        {/* Email only — OTP code is sent after this */}
        <View className="px-6">
          <AuthInputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            keyboardType="email-address"
          />
        </View>

        {/* Error message */}
        {error ? (
          <View className="px-6 mt-3">
            <Text
              className="text-body-sm text-center"
              style={{ color: "#FF4D4F" }}
            >
              {error}
            </Text>
          </View>
        ) : null}

        {/* Sign In CTA */}
        <View className="px-6 mt-5">
          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.85}
            disabled={isLoading || !email}
            className="bg-lingua-purple rounded-2xl py-[18px] items-center"
            style={{ opacity: isLoading || !email ? 0.6 : 1 }}
          >
            <Text
              className="text-white text-body-lg"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {isLoading ? "Sending code…" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 px-6 my-5">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="text-body-sm text-text-secondary">
            or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Social buttons */}
        <View className="px-6 gap-3">
          <SocialButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onPress={handleGoogleSignIn}
          />
          <SocialButton
            icon={<FacebookIcon />}
            label="Continue with Facebook"
          />
          <SocialButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onPress={handleAppleSignIn}
          />
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-6 mb-8">
          <Text className="text-body-sm text-text-secondary">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text
              className="text-body-sm text-lingua-purple"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    fontSize: 24,
    color: "#001132",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  fbCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#1877F2",
    alignItems: "center",
    justifyContent: "center",
  },
  fbLetter: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: "#FFFFFF",
    lineHeight: 18,
  },
  appleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  appleLetter: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "#FFFFFF",
    lineHeight: 18,
  },
});
