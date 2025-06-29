import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedScreen from "screens/SavedScreen";
import { SavedTabNavigatorParamList } from "types/navigation";

const Stack = createNativeStackNavigator<SavedTabNavigatorParamList>();

export default function OrderTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SavedScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SavedScreen"
        component={SavedScreen}
      />
    </Stack.Navigator>
  );
}
