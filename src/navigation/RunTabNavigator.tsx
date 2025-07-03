import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RunScreen from 'screens/RunScreen';
import { RunTabNavigatorParamList } from 'types/navigation';
import AddAPIModal from 'components/modals/AddApiModal';

const Stack = createNativeStackNavigator<RunTabNavigatorParamList>();

export default function RunTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RunScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="RunScreen"
        component={RunScreen}
      />
      <Stack.Screen
        name="addApiModalNavigator"
        component={AddAPIModal}
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
