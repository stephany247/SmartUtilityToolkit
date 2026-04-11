import React from "react";
import { ConverterScreen } from "./src/screens/ConverterScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ConverterScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
