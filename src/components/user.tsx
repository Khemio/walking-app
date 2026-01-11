import { StyleSheet, Text, View } from "react-native";

type Route = {
  name: string;
  isActive?: boolean;
};

type Highlight = {
  title: string;
  primary: string;
  secondary: string;
  meta: string;
};

type UserProps = {
  username: string;
  stepCount: number;
  routes: Route[];
  goal?: number;
  highlights?: Highlight[];
};

function progressPctLabel(goal: number, steps: number) {
  const pct = Math.min(Math.round((steps / goal) * 100), 999);
  return pct.toString();
}

const User = ({ username, stepCount, routes, goal = 10000, highlights = [] }: UserProps) => {
  const fallbackHighlights: Highlight[] = [
    { title: "Today", primary: stepCount.toLocaleString(), secondary: "steps", meta: "Daily progress" },
    { title: "Goal", primary: progressPctLabel(goal, stepCount), secondary: "%", meta: `${goal.toLocaleString()} target` },
  ];

  const hasRoutes = routes && routes.length > 0;
  const activeRoute = hasRoutes ? routes.find(r => r.isActive) : undefined;
  const fallbackRoute = hasRoutes ? routes[routes.length - 1] : undefined;

  const routeLabel = activeRoute
    ? `On route: ${activeRoute.name}`
    : fallbackRoute
    ? `Last route: ${fallbackRoute.name}`
    : "No routes yet";

  const progress = Math.min(stepCount / goal, 1);
  const progressPct = Math.round(progress * 100);
  const highlightCards = highlights.length > 0 ? highlights : fallbackHighlights;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.eyebrow}>Walker</Text>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.route}>{routeLabel}</Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressLabel}>{progressPct}%</Text>
          <Text style={styles.progressSub}>of {goal.toLocaleString()} steps</Text>
        </View>
      </View>

      <View style={styles.stepsRow}>
        <View>
          <Text style={styles.steps}>{stepCount.toLocaleString()}</Text>
          <Text style={styles.stepsLabel}>steps today</Text>
        </View>
        {activeRoute ? (
          <View style={styles.pill}>
            <Text style={styles.pillText}>Active route</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0d1427",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  eyebrow: {
    color: "#9ca3af",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  name: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "800",
  },
  route: {
    color: "#9ca3af",
    marginTop: 4,
    fontSize: 14,
  },
  progressBadge: {
    alignItems: "flex-end",
  },
  progressLabel: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "800",
  },
  progressSub: {
    color: "#9ca3af",
    fontSize: 12,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  steps: {
    color: "#f9fafb",
    fontSize: 28,
    fontWeight: "800",
  },
  stepsLabel: {
    color: "#9ca3af",
    fontSize: 13,
  },
  pill: {
    backgroundColor: "#10b981",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  pillText: {
    color: "#052e16",
    fontSize: 12,
    fontWeight: "700",
  },
  highlights: {
    marginTop: 16,
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  highlightCard: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    width: "48%",
    marginBottom: 12,
  },
  highlightTitle: {
    color: "#94a3b8",
    fontSize: 12,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 6,
  },
  highlightPrimary: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "800",
    marginRight: 4,
  },
  highlightSecondary: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  highlightMeta: {
    color: "#22d3ee",
    fontSize: 12,
    marginTop: 6,
  },
});

export default User;
