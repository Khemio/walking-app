import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const highlights = [
    { title: "Steps", primary: "52,340", secondary: "this week", meta: "+8% vs last" },
    { title: "Distance", primary: "38.4 km", secondary: "", meta: "Goal 42 km" },
    { title: "Streak", primary: "6 days", secondary: "moving", meta: "Keep it alive" },
    { title: "Pace", primary: "9:28 /km", secondary: "", meta: "Steady & smooth" },
  ];

  const rows = [
    { label: "Longest walk", value: "7.9 km" },
    { label: "Active minutes", value: "312 min" },
    { label: "Elevation gain", value: "430 m" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Stats</Text>
          <Text style={styles.title}>Your week at a glance</Text>
          <Text style={styles.subtitle}>Highlights to keep you on track.</Text>
        </View>

        <View style={styles.grid}>
          {highlights.map(card => (
            <View key={card.title} style={styles.card}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardPrimary}>{card.primary}</Text>
              {card.secondary ? <Text style={styles.cardSecondary}>{card.secondary}</Text> : null}
              <Text style={styles.cardMeta}>{card.meta}</Text>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>This week</Text>
          <View style={styles.list}>
            {rows.map(item => (
              <View key={item.label} style={styles.listRow}>
                <Text style={styles.listLabel}>{item.label}</Text>
                <Text style={styles.listValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1221",
  },
  container: {
    padding: 20,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 16,
  },
  eyebrow: {
    color: "#9ca3af",
    letterSpacing: 0.6,
    fontSize: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
    width: "48%",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#94a3b8",
    fontSize: 13,
  },
  cardPrimary: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },
  cardSecondary: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 2,
  },
  cardMeta: {
    color: "#22d3ee",
    fontSize: 12,
    marginTop: 8,
  },
  block: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  list: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  listLabel: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  listValue: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "700",
  },
});
