import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { palette } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUS = {
  COMPLETE: 1,
  CANCELED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) =>
    setFocusHistory([...focusHistory, { subject, status }]);
  const onClear = () => setFocusHistory([]);

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('focusHistory'));

      if (history && history.length) {
        setFocusHistory(history);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.CANCELED);
            setFocusSubject(null);
          }}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 'ios' === Platform.OS ? spacing.md : spacing.lg,
    backgroundColor: palette.darkBlue,
  },
});
