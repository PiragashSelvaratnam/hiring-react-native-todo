import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
