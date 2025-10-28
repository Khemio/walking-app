import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DailyStepsWidget from '../../../components/DailyStepsWidget';
import WorkoutScreen from '../../../components/WorkoutScreen';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DailyStepsWidget />
      <WorkoutScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});
