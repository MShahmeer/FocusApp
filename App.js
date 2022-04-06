import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
export default function App() {
  const [focusSubject, setFocusedSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    if(focusSubject){
      setFocusHistory([...focusHistory,focusSubject])
    }
  },[focusSubject])

  console.log(focusHistory)
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusedSubject(null);
          }}

          clearSubject = {() => setFocusedSubject(null)}
        />
      ) : (
        <Focus addSubject={setFocusedSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
