import React, { useMemo, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/src/lib/store";
import { Group, User } from "@/src/lib/types";
import FriendCard from "@/src/components/social/FriendCard";
import GroupCard from "@/src/components/social/GroupCard";

type TabKey = "friends" | "groups";
type Selection = { type: "friend"; item: User } | { type: "group"; item: Group };

export default function Social() {
  const friends = useUserStore(state => state.friends);
  const groups = useUserStore(state => state.groups);

  const displayedFriends = useMemo(
    () => Array.from(new Map(friends.map(friend => [friend.id, friend])).values()),
    [friends],
  );
  const displayedGroups = useMemo(
    () => Array.from(new Map(groups.map(group => [group.id, group])).values()).slice(0, 3),
    [groups],
  );

  const [activeTab, setActiveTab] = useState<TabKey>("friends");
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleCloseModal = () => setSelection(null);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "friends", label: "Friends" },
    { key: "groups", label: "Groups" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Community</Text>
          <Text style={styles.title}>Stay connected</Text>
          <Text style={styles.subtitle}>Swap encouragement with friends and groups.</Text>
        </View>

        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <Pressable
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "friends" ? (
          <FlatList
            data={displayedFriends}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <FriendCard friend={item} onPress={friend => setSelection({ type: "friend", item: friend })} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No friends yet</Text>
                <Text style={styles.emptySubtitle}>Add walkers to see their stats here.</Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={displayedGroups}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <GroupCard group={item} onPress={group => setSelection({ type: "group", item: group })} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No groups yet</Text>
                <Text style={styles.emptySubtitle}>Join a crew to start sharing progress.</Text>
              </View>
            }
          />
        )}
      </View>

      <Modal transparent visible={!!selection} animationType="fade" onRequestClose={handleCloseModal}>
        <Pressable style={styles.modalBackdrop} onPress={handleCloseModal}>
          <Pressable style={styles.modalCard} onPress={(event: GestureResponderEvent) => event.stopPropagation()}>
            {selection?.type === "friend" ? (
              <>
                <Text style={styles.modalEyebrow}>Friend</Text>
                <Text style={styles.modalTitle}>{selection.item.username}</Text>
                <Text style={styles.modalMeta}>
                  {selection.item.step_count.toLocaleString()} steps logged
                </Text>
                <Text style={styles.modalSmall}>User ID: {selection.item.id}</Text>
              </>
            ) : null}

            {selection?.type === "group" ? (
              <>
                <Text style={styles.modalEyebrow}>Group</Text>
                <Text style={styles.modalTitle}>{selection.item.name}</Text>
                <Text style={styles.modalMeta}>
                  {selection.item.members?.length || 0} member
                  {(selection.item.members?.length || 0) === 1 ? "" : "s"}
                </Text>
                <View style={styles.modalList}>
                  {selection.item.members?.map(member => (
                    <View key={member.id} style={styles.modalListRow}>
                      <Text style={styles.modalListBullet}>•</Text>
                      <Text style={styles.modalListText}>{member.username}</Text>
                    </View>
                  )) || null}
                </View>
              </>
            ) : null}

            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonLabel}>Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  eyebrow: {
    color: "#9ca3af",
    letterSpacing: 0.5,
    fontSize: 12,
  },
  title: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 15,
    marginTop: 6,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#0d1427",
    padding: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f2937",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#1f2937",
    borderColor: "#ffd33d",
    borderWidth: 1,
  },
  tabLabel: {
    color: "#94a3b8",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: "#ffd33d",
  },
  list: {
    paddingVertical: 10,
  },
  separator: {
    height: 10,
  },
  emptyState: {
    padding: 28,
    borderRadius: 16,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1f2937",
    alignItems: "center",
    marginTop: 20,
  },
  emptyTitle: {
    color: "#e5e7eb",
    fontSize: 17,
    fontWeight: "800",
  },
  emptySubtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 24,
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  modalEyebrow: {
    color: "#94a3b8",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  modalTitle: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  modalMeta: {
    color: "#cbd5e1",
    fontSize: 15,
    marginTop: 10,
  },
  modalSmall: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 6,
  },
  modalList: {
    marginTop: 14,
  },
  modalListRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  modalListBullet: {
    color: "#22d3ee",
    marginRight: 8,
    fontSize: 14,
  },
  modalListText: {
    color: "#e5e7eb",
    fontSize: 15,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#15213a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  closeButtonLabel: {
    color: "#e5e7eb",
    fontWeight: "700",
  },
});
