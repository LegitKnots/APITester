import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RunScreen from "screens/RunScreen";
import { RunTabNavigatorParamList } from "types/navigation";

const Stack = createNativeStackNavigator<RunTabNavigatorParamList>();

export default function OrderTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RunScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="RunScreen"
        component={RunScreen}
      />
    </Stack.Navigator>
  );
}
