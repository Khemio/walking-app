import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "@/src/lib/types";

type FriendCardProps = {
  friend: User;
  onPress: (friend: User) => void;
};

const FriendCard = ({ friend, onPress }: FriendCardProps) => {
  const initials = friend.username ? friend.username[0].toUpperCase() : "?";
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress(friend)}>
      <View>
        <Text style={styles.cardTitle}>{friend.username || "Unknown walker"}</Text>
        <Text style={styles.cardMeta}>{friend.step_count.toLocaleString()} steps logged</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>{initials}</Text>
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
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  avatarLabel: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default FriendCard;
