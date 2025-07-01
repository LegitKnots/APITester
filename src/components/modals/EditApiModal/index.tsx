import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  EditApiModal,
  EditRequestHeadersScreen,
  EditRequestBodyScreen,
} from './main';
import type { EditAPIModalNavigatorParamList } from 'types/navigation';
import Header from 'components/ui/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { APICallDraftProvider } from 'context/APICallDraftContext';
import type { RouteProp } from '@react-navigation/native';
import type { APICall } from 'types/APIs';

const Stack = createNativeStackNavigator<EditAPIModalNavigatorParamList>();

export default function EditAPIModalNavigator() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<any, any>>();
  const editingApi = (route.params as { editingApi: APICall })?.editingApi;

  if (!editingApi) {
    return null;
  }

  return (
    <APICallDraftProvider>
      <Header
        title="Edit API"
        onBackPress={() => navigation.goBack()}
        leftIcon="close"
        topPadding={false}
      />
      <Stack.Navigator
        initialRouteName="EditApiModal"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="EditApiModal"
          component={EditApiModal}
          initialParams={{ editingApi }}
        />

        <Stack.Screen
          name="EditRequestHeadersScreen"
          component={EditRequestHeadersScreen}
        />
        <Stack.Screen
          name="EditRequestBodyScreen"
          component={EditRequestBodyScreen}
        />
      </Stack.Navigator>
    </APICallDraftProvider>
  );
}
