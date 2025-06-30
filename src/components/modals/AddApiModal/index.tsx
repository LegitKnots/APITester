import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AddApiModal,
  AddRequestHeadersScreen,
  AddRequestBodyScreen,
} from './main';
import { AddAPIModalNavigatorParamList } from 'types/navigation';
import Header from 'components/ui/Header';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator<AddAPIModalNavigatorParamList>();
import { APICallDraftProvider } from 'context/APICallDraftContext';

export default function AddAPIModalNavigator() {
  const navigation = useNavigation();
  return (
    <APICallDraftProvider>
      <Header
        title="Add API"
        onBackPress={() => navigation.goBack()}
        leftIcon="close"
        topPadding={false}
      />
      <Stack.Navigator
        initialRouteName="AddApiModal"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddApiModal" component={AddApiModal} />
        <Stack.Screen
          name="AddRequestHeadersScreen"
          component={AddRequestHeadersScreen}
        />
        <Stack.Screen
          name="AddRequestBodyScreen"
          component={AddRequestBodyScreen}
        />
      </Stack.Navigator>
    </APICallDraftProvider>
  );
}
