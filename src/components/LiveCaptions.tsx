import { View, Text, StyleSheet } from "react-native";
import { useCallStateHooks } from "@stream-io/video-react-native-sdk";

import { AGENT_USER_ID } from "@/constants/agent";

/**
 * Rolling live captions for the lesson call — transcribes both the AI
 * teacher's and the student's speech in real time via Stream's closed
 * captions (`useCallClosedCaptions` mirrors the `call.closed_caption` events
 * the backend emits for every participant). Pure overlay: ignores touches so
 * it never blocks the controls beneath it.
 */
export default function LiveCaptions() {
  const { useCallClosedCaptions } = useCallStateHooks();
  const captions = useCallClosedCaptions();

  if (!captions.length) return null;

  return (
    <View style={styles.root} pointerEvents="none">
      {captions.map(({ user, start_time, text }) => {
        const isTeacher = user.id === AGENT_USER_ID;
        return (
          <View key={`${user.id}/${start_time}`} style={styles.line}>
            <Text
              style={[styles.speaker, isTeacher ? styles.speakerTeacher : styles.speakerStudent]}
              numberOfLines={1}
            >
              {isTeacher ? user.name ?? "Teacher" : "You"}
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              {text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 96,
    left: 16,
    right: 16,
    gap: 6,
    zIndex: 15,
  },
  line: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    backgroundColor: "rgba(0, 17, 50, 0.7)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  speaker: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  speakerTeacher: {
    color: "#C4B5FD",
  },
  speakerStudent: {
    color: "#5EEAD4",
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    lineHeight: 18,
  },
});
