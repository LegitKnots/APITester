import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabNavigatorParamList } from 'types/navigation';
import COLORS from 'styles/core/colors';

import RunTabNavigator from "./RunTabNavigator"
import SavedTabNavigator from "./SavedTabNavigator"
import SettingsTabNavigator from "./SettingsTabNavigator"


const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const ICON_SIZE = Platform.select({
  ios: 28,
  android: 24,
  default: 24,
}) as number;

const TAB_ICONS: Record<keyof TabNavigatorParamList, string> = {
  run: 'terminal',
  saved: 'save',
  settings: 'settings',
};

const TAB_LABELS: Record<keyof TabNavigatorParamList, string> = {
  run: 'Run',
  saved: 'Saved',
  settings: 'Settings',
};

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="saved"
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        unmountOnBlur: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: (Platform.OS === 'ios' ? 60 : 50) + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: COLORS.background.secondary,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#333',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#555',
        tabBarIcon: ({ color }) => (
          <MaterialIcons
            name={
              TAB_ICONS[route.name as keyof TabNavigatorParamList] || 'circle'
            }
            size={ICON_SIZE}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="saved"
        component={SavedTabNavigator}
        options={{ tabBarLabel: TAB_LABELS.saved }}
      />
      <Tab.Screen
        name="run"
        component={RunTabNavigator}
        options={{ tabBarLabel: TAB_LABELS.run }}
      />
      
      <Tab.Screen
        name="settings"
        component={SettingsTabNavigator}
        options={{ tabBarLabel: TAB_LABELS.settings }}
      />
    </Tab.Navigator>
  );
}
