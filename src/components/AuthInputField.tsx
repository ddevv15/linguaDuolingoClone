import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export default function AuthInputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showPasswordToggle,
  onTogglePassword,
  keyboardType = "default",
  autoCapitalize = "none",
}: Props) {
  return (
    <View style={styles.card}>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-caption text-text-secondary mb-1">{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            style={styles.input}
          />
        </View>
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} className="pl-3 py-1">
            <Text style={styles.eyeIcon}>{secureTextEntry ? "🙈" : "👁"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001132",
    padding: 0,
    margin: 0,
  },
  eyeIcon: {
    fontSize: 18,
  },
});
