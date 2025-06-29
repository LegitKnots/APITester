import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddApiModal, AddRequestHeadersScreen, AddRequestBodyScreen} from 'components/modals/AddApiModal/index';
import { AddAPIModalNavigatorParamList } from 'types/navigation';
import Header from 'components/ui/Header';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import COLORS from 'styles/core/colors';

const Stack = createNativeStackNavigator<AddAPIModalNavigatorParamList>();

type Props = {
  onClose: () => void;
};

export default function AddAPIModalNavigator({ onClose }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.container}
    >
      <Header
        title="Add API"
        onBackPress={onClose}
        leftIcon="close"
        topPadding={false}
      />

      <Stack.Navigator
        initialRouteName="AddApiModal"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddApiModal" component={AddApiModal} />
        <Stack.Screen name="AddRequestHeadersScreen" component={AddRequestHeadersScreen} />
        <Stack.Screen name="AddRequestBodyScreen" component={AddRequestBodyScreen} />

      </Stack.Navigator>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
});
