import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RunScreen from 'screens/RunScreen';
import { RunTabNavigatorParamList } from 'types/navigation';
import AddAPIModal from 'components/modals/AddApiModal';

const Stack = createNativeStackNavigator<RunTabNavigatorParamList>();

export default function OrderTabNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RunScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="RunScreen" component={RunScreen} />
      <Stack.Screen
        name="AddApiModal"
        component={AddAPIModal}
        options={{ presentation: 'modal', headerShown: false }} // ← this is key
      />
    </Stack.Navigator>
  );
}
