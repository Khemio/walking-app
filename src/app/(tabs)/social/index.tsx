import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useUserStore } from "@/src/lib/store";

export default function Index() {
  const friends = useUserStore(state => state.friends);
  const groups = useUserStore(state => state.groups);
  const [tab, setTab] = useState<"friends" | "groups">("friends");

  const tabs = useMemo(
    () => [
      { key: "friends", label: `Friends (${friends.length})` },
      { key: "groups", label: `Groups (${groups.length})` },
    ],
    [friends.length, groups.length]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Social</Text>
          <Text style={styles.subtitle}>See how your people are moving.</Text>
        </View>

        <View style={styles.tabBar}>
          {tabs.map(t => (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key as typeof tab)}
              style={[styles.tab, tab === t.key && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {tab === "friends"
            ? friends.map(friend => (
                <View key={friend.id} style={styles.card}>
                  <View>
                    <Text style={styles.cardTitle}>{friend.username}</Text>
                    <Text style={styles.cardMeta}>{friend.step_count.toLocaleString()} steps</Text>
                  </View>
                  <Text style={styles.badge}>Friend</Text>
                </View>
              ))
            : groups.map(group => (
                <View key={group.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{group.name}</Text>
                    <Text style={styles.cardMeta}>{group.members.length} members</Text>
                  </View>
                  <View style={styles.memberRow}>
                    {group.members.slice(0, 3).map(member => (
                      <View key={member.id} style={styles.memberChip}>
                        <Text style={styles.memberText}>{member.username}</Text>
                      </View>
                    ))}
                    {group.members.length > 3 ? (
                      <Text style={styles.moreText}>+{group.members.length - 3} more</Text>
                    ) : null}
                  </View>
                </View>
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1221",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#0ea5e9",
  },
  tabText: {
    color: "#94a3b8",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#0b1221",
  },
  list: {
    paddingBottom: 24,
    gap: 10,
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeader: {
    marginBottom: 4,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#22d3ee",
    color: "#0b1221",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  memberChip: {
    backgroundColor: "#111827",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  memberText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "600",
  },
  moreText: {
    color: "#94a3b8",
    fontSize: 12,
  },
});
