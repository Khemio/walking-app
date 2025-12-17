/*import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DailyStepsWidget from '../../../components/DailyStepsWidget';
import WorkoutScreen from '../../../components/WorkoutScreen';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DailyStepsWidget />
      <WorkoutScreen />
    </ScrollView>*/
import DailyStepsWidget from '@/src/components/DailyStepsWidget';
import User from "@/src/components/user";
import WorkoutScreen from '@/src/components/WorkoutScreen';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const mockRoutes = [
  { name: "Harbor Loop", isActive: true },
  { name: "Cedar Trail" },
  { name: "Park Perimeter" },
];

const highlights = [
  { title: "Today", primary: "7,340", secondary: "steps", meta: "+1.2k vs avg" },
  { title: "Distance", primary: "5.4", secondary: "km", meta: "Goal 7.0 km" },
  { title: "Streak", primary: "4", secondary: "days", meta: "Keep it going" },
  { title: "Pace", primary: "9:42", secondary: "/km", meta: "Steady & smooth" },
];

export default function Home() {
  const user = {
    username: "Nina",
    stepCount: 7340,
    goal: 10000,
    routes: mockRoutes,
  };

  const activeRoute = user.routes.find(route => route.isActive);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header, styles.block]}>
          <Text style={styles.eyebrow}>Today</Text>
          <Text style={styles.title}>Walk your plan</Text>
          <Text style={styles.subtitle}>Small wins add up. Keep moving.</Text>
        </View>

        <View style={styles.block}>
          <User {...user} highlights={highlights} />
        </View>

        <DailyStepsWidget />
        <WorkoutScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /*container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },*/
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1221",
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 8,
  },
  block: {
    marginBottom: 18,
  },
  eyebrow: {
    color: "#9ca3af",
    letterSpacing: 0.5,
    fontSize: 12,
  },
  title: {
    color: "#f9fafb",
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    marginTop: 6,
  },
  section: {
    marginTop: 4,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  routeCard: {
    backgroundColor: "#15213a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  routeTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  routeCopy: {
    color: "#cbd5e1",
    fontSize: 14,
  },
});
