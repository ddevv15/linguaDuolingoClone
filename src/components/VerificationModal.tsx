import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
};

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
}: Props) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setError("");
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [visible]);

  async function handleCodeChange(text: string) {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);
    setError("");

    if (digits.length === 6) {
      setIsVerifying(true);
      try {
        await onVerify(digits);
      } catch (e: any) {
        const msg =
          e?.errors?.[0]?.longMessage ||
          e?.errors?.[0]?.message ||
          e?.message ||
          "Incorrect code. Please try again.";
        setError(msg);
        setCode("");
      } finally {
        setIsVerifying(false);
      }
    }
  }

  async function handleResend() {
    if (!onResend) return;
    setError("");
    setCode("");
    try {
      await onResend();
    } catch (e: any) {
      const msg =
        e?.errors?.[0]?.message || e?.message || "Failed to resend code.";
      setError(msg);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Overlay — tap to dismiss */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          {/* Card — intercept taps so overlay doesn't fire */}
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.sheet}>
              {/* Handle bar */}
              <View style={styles.handle} />

              <Text className="text-h3 text-text-primary mb-1">
                Check your email
              </Text>
              <Text className="text-body-md text-text-secondary mb-8">
                {"We sent a 6-digit code to\n"}
                <Text
                  className="text-text-primary"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  {email || "your email"}
                </Text>
              </Text>

              {/* OTP digit boxes */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
              >
                <View style={styles.otpRow}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.otpBox,
                        code[i] !== undefined
                          ? styles.otpBoxFilled
                          : styles.otpBoxEmpty,
                        error ? styles.otpBoxError : null,
                      ]}
                    >
                      {isVerifying && i === 0 ? (
                        <ActivityIndicator size="small" color="#6C4EF5" />
                      ) : (
                        <Text className="text-h3 text-text-primary">
                          {code[i] ?? ""}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </TouchableOpacity>

              {/* Hidden input captures number-pad keypresses */}
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleCodeChange}
                keyboardType="number-pad"
                maxLength={6}
                editable={!isVerifying}
                style={styles.hiddenInput}
              />

              {/* Error message */}
              {error ? (
                <Text
                  className="text-body-sm text-center mt-4"
                  style={{ color: "#FF4D4F" }}
                >
                  {error}
                </Text>
              ) : null}

              <Text className="text-body-sm text-text-secondary text-center mt-6">
                {"Didn't receive the code? "}
                <Text
                  className="text-lingua-purple"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                  onPress={handleResend}
                >
                  Resend
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 48,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  otpBoxEmpty: {
    borderColor: "#E5E7EB",
  },
  otpBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#F6F7FB",
  },
  otpBoxError: {
    borderColor: "#FF4D4F",
    backgroundColor: "#FFF1F0",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
