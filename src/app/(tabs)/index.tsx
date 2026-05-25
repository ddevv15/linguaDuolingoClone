import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-h2 text-text-primary">🎉 You're in!</Text>

        <Text className="text-body-md text-text-secondary text-center">
          Signed in as{"\n"}
          <Text
            className="text-text-primary"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            {user?.primaryEmailAddress?.emailAddress ?? "—"}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.85}
          className="mt-6 border border-border rounded-2xl py-4 px-10"
        >
          <Text
            className="text-body-md text-text-secondary"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
