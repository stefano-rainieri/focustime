import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette } from '../utils/colors';
import { font, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (10 > time ? `0${time}` : time);

export const Countdown = ({
  minutes = 1,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const interval = useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (0 === time) {
        clearInterval(interval.current);
        onEnd();

        return time;
      }

      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));

      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);

        return;
      }
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: font.xxxxl,
    fontWeight: 'bold',
    color: palette.white,
    padding: spacing.lg,
    backgroundColor: palette.lightBlue,
  },
});
