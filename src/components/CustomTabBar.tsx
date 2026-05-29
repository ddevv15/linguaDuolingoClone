import { useEffect } from "react";
import { View, Pressable, useWindowDimensions, StyleSheet, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const CIRCLE_SIZE = 48;
const TAB_BAR_HEIGHT = 60;
const ACTIVE_COLOR = "#6C4EF5";
const INACTIVE_COLOR = "#9CA3AF";

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TABS: TabConfig[] = [
  { name: "index", label: "Home", icon: "home-outline", activeIcon: "home" },
  { name: "learn", label: "Learn", icon: "book-outline", activeIcon: "book" },
  {
    name: "ai-teacher",
    label: "AI Teacher",
    icon: "videocam-outline",
    activeIcon: "videocam",
  },
  {
    name: "chat",
    label: "Chat",
    icon: "chatbubble-outline",
    activeIcon: "chatbubble",
  },
  {
    name: "profile",
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const tabWidth = width / TABS.length;
  const activeIndex = useSharedValue(state.index);

  // Animate the circle to the new active tab with a spring
  useEffect(() => {
    activeIndex.value = withSpring(state.index, {
      damping: 18,
      stiffness: 200,
      mass: 0.8,
    });
  }, [state.index]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          activeIndex.value * tabWidth + tabWidth / 2 - CIRCLE_SIZE / 2,
      },
    ],
  }));

  const barHeight = TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View
      style={[
        styles.container,
        { height: barHeight, paddingBottom: insets.bottom },
      ]}
    >
      {/* Animated active circle — positioned absolutely, slides behind icons */}
      <Animated.View style={[styles.activeCircle, circleStyle]} />

      {TABS.map((tab, index) => {
        const isActive = state.index === index;
        const route = state.routes[index];

        return (
          <Pressable
            key={tab.name}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? "#FFFFFF" : INACTIVE_COLOR}
            />
            {!isActive && <Text style={styles.label}>{tab.label}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  activeCircle: {
    position: "absolute",
    top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: ACTIVE_COLOR,
  },
  tab: {
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  label: {
    fontSize: 10,
    color: INACTIVE_COLOR,
    fontFamily: "Poppins-Medium",
  },
});
