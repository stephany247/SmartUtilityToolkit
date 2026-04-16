import React, { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ConverterScreen } from "./src/screens/ConverterScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { colors } from "./src/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
type IoniconName = ComponentProps<typeof Ionicons>["name"];

function TabIcon({
  name,
  label,
  focused,
}: {
  name: IoniconName;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={tabStyles.iconWrapper}>
      <Ionicons
        name={name}
        size={20}
        color={focused ? colors.accent : colors.text3}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[tabStyles.label, focused && tabStyles.labelActive]}
      >
        {label}
      </Text>
      {focused && <View style={tabStyles.dot} />}
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: tabStyles.bar,
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="Converter"
              component={ConverterScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    name="swap-vertical"
                    label="Convert"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Tasks"
              component={TasksScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    name="checkmark-done-circle"
                    label="Tasks"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: colors.bg,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.07)",
    marginBottom: 6,
    marginTop: 10,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingTop: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.text3,
    letterSpacing: 0.2,
  },
  labelActive: { color: colors.accent },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginTop: 1,
  },
});
