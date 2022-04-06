import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { Timings } from "./Timings";

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("Start");
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };
  const changeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On </Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>

      <ProgressBar
        progress={progress}
        color="#5E84E2"
        style={{ height: 10, marginTop: spacing.md }}
      />

      <View style={styles.buttonWrapper}>
        <Timings onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={buttonStatus}
          onPress={() => {
            if (buttonStatus === "Start") {
              setIsStarted(true);
              setButtonStatus("Pause");
            } else {
              setIsStarted(false);
              setButtonStatus("Start");
            }
          }}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontSize: 20
  },
  task: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});