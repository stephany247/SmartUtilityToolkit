import React from "react";
import { ConverterScreen } from "./src/screens/ConverterScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ConverterScreen />
    </SafeAreaProvider>
  );
}
