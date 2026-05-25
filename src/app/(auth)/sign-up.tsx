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
import { useSignUp, useSSO } from "@clerk/expo";
import { images } from "@/constants/images";
import AuthInputField from "@/components/AuthInputField";
import VerificationModal from "@/components/VerificationModal";

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
export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const isLoading = fetchStatus === "fetching";

  async function handleSignUp() {
    setError("");
    try {
      const { error: signUpError } = await signUp.password({
        emailAddress: email,
        password,
      });
      if (signUpError) {
        setError(signUpError.longMessage ?? signUpError.message);
        return;
      }
      await signUp.verifications.sendEmailCode();
      setModalVisible(true);
    } catch (e: any) {
      setError(e?.errors?.[0]?.longMessage ?? e?.message ?? "Sign up failed.");
    }
  }

  async function handleVerify(code: string) {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      const e: any = new Error(error.longMessage ?? error.message);
      e.errors = [error];
      throw e;
    }
    await signUp.finalize({
      navigate: () => {
        setModalVisible(false);
        router.replace("/(tabs)");
      },
    });
  }

  async function handleResend() {
    await signUp.verifications.sendEmailCode();
  }

  async function handleGoogleSignUp() {
    setError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (e: any) {
      setError(e?.message || "Google sign-up failed.");
    }
  }

  async function handleAppleSignUp() {
    setError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
        redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (e: any) {
      setError(e?.message || "Apple sign-up failed.");
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
          <Text className="text-h2 text-text-primary mb-1">
            Create your account
          </Text>
          <Text className="text-body-md text-text-secondary">
            Start your language journey today ✨
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

        {/* Form fields */}
        <View className="px-6 gap-3">
          <AuthInputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            keyboardType="email-address"
          />
          <AuthInputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            showPasswordToggle
            onTogglePassword={() => setShowPassword((prev) => !prev)}
          />
        </View>

        {/* Clerk captcha target — invisible, required for bot protection */}
        <View nativeID="clerk-captcha" />

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

        {/* Sign Up CTA */}
        <View className="px-6 mt-5">
          <TouchableOpacity
            onPress={handleSignUp}
            activeOpacity={0.85}
            disabled={isLoading || !email || !password}
            className="bg-lingua-purple rounded-2xl py-[18px] items-center"
            style={{ opacity: isLoading || !email || !password ? 0.6 : 1 }}
          >
            <Text
              className="text-white text-body-lg"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {isLoading ? "Creating account…" : "Sign Up"}
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
            onPress={handleGoogleSignUp}
          />
          <SocialButton
            icon={<FacebookIcon />}
            label="Continue with Facebook"
          />
          <SocialButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onPress={handleAppleSignUp}
          />
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-6 mb-8">
          <Text className="text-body-sm text-text-secondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text
              className="text-body-sm text-lingua-purple"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Log in
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
