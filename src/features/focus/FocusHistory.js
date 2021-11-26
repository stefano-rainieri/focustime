import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { palette } from '../../utils/colors';
import { font, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      {focusHistory.length ? (
        <>
          <Text style={styles.title}>Things we have focus on</Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>
            <RoundedButton
              title="⛔️"
              size={spacing.xxxxl}
              onPress={clearHistory}
            />
          </View>
        </>
      ) : (
        <Text style={styles.title}>Nothing to focus on</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: font.md,
  }),
  title: {
    color: 'white',
    fontSize: font.lg,
  },
  clearContainer: {
    paddingBottom: spacing.xxxl,
  }
});
