import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

const minutesToMilliSeconds = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval  = React.useRef(null);
  const [milliSeconds, setMilliSeconds] = useState(null);

  const countDown = () => {
    setMilliSeconds((time) => {
      if(time === 0){
        clearInterval(interval.current)
        return time;
      }
      const timeLeft = time - 1000
      return timeLeft;
    })
  }

  useEffect(() => {
    setMilliSeconds(minutesToMilliSeconds(minutes))
  }, [minutes])

  useEffect(() => {
    onProgress(milliSeconds/minutesToMilliSeconds(minutes))
    if(milliSeconds === 0){
      onEnd();
    }
  },[milliSeconds])

  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return
    }
    interval.current = setInterval(countDown, 1000)

    return () => {clearInterval(interval.current )}
  }, [isPaused])


  const minute = Math.floor(milliSeconds / 1000 / 60) % 60;
  const seconds = Math.floor(milliSeconds / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
