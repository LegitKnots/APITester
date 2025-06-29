import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "screens/SettingsScreen";
import { SettingsTabNavigatorParamList } from "types/navigation";

const Stack = createNativeStackNavigator<SettingsTabNavigatorParamList>();

export default function OrderTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}
