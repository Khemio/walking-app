import { initMock } from "@/src/lib/mock";
import { Stack } from "expo-router";

// Use this function to initialize useUserStore with fake data
initMock();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

