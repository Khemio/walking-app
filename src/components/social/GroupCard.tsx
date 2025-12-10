import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Group } from "@/src/lib/types";

type GroupCardProps = {
  group: Group;
  onPress: (group: Group) => void;
};

const GroupCard = ({ group, onPress }: GroupCardProps) => {
  const memberCount = group.members?.length || 0;
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress(group)}>
      <View>
        <Text style={styles.cardTitle}>{group.name}</Text>
        <Text style={styles.cardMeta}>{memberCount} member{memberCount === 1 ? "" : "s"}</Text>
      </View>
      <View style={styles.countBadge}>
        <Text style={styles.countBadgeLabel}>{memberCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#f9fafb",
    fontSize: 18,
    fontWeight: "800",
  },
  cardMeta: {
    color: "#9ca3af",
    marginTop: 6,
    fontSize: 13,
  },
  countBadge: {
    backgroundColor: "#111827",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  countBadgeLabel: {
    color: "#fcd34d",
    fontWeight: "800",
  },
});

export default GroupCard;
