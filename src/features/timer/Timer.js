import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Timing } from './Timing';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { palette } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => setProgress(progress);
  const onChangeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setIsStarted(false);
  };
  const onEnd = () => {
    onChangeTime(DEFAULT_TIME);
    vibrate();
    onTimerEnd();
  };

  const vibrate = () => {
    if ('ios' === Platform.OS) {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);

      return;
    }

    Vibration.vibrate(10000);
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
      <View style={styles.content}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color={palette.lightBlue}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={onChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="▶️" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="⏸" onPress={() => setIsStarted(false)} />
        )}
        <View style={styles.clearSubject}>
          <RoundedButton title="❎" size={spacing.xxl} onPress={() => clearSubject()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: spacing.xxxxl,
  },
  title: {
    color: palette.white,
    textAlign: 'center',
  },
  task: {
    color: palette.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    paddingTop: spacing.md,
  },
  progressBar: {
    height: spacing.md,
  },
  buttonWrapper: {
    flex: 0.3,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  clearSubject: {
    paddingLeft: spacing.lg,
  }
});
