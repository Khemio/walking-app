import React from 'react';
import { View, StyleSheet } from 'react-native';
import DailyStepsWidget from '../components/DailyStepsWidget';
import WorkoutScreen from '../components/WorkoutScreen';

export default function Index() {
  return (
    <View style={styles.container}>
      <DailyStepsWidget />
      <WorkoutScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50, // Add padding to avoid overlap with status bar
  },
});
