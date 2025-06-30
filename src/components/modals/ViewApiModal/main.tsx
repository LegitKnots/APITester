import ViewApiDetails from './ViewApiDetails';
import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RunAPIsScreen from './RunApiScreen';
import ApiSettingsScreen from './ApiSettingsScreen';

import COLORS from 'styles/core/colors';
import type { APICall } from 'types/APIs';

type Props = {
  currentlyViewedApi: APICall;
};

export function ViewApiModal({ currentlyViewedApi }: Props) {

  const [activeTab, setActiveTab] = useState<'Details' | 'Run' | 'Settings'>('Details')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.container}
    >
      <View style={styles.upperTabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Details')} style={activeTab == 'Details' ? styles.upperTabActive : styles.upperTab}>
          <MaterialIcons name='info-outline' style={activeTab == 'Details' ? styles.upperTabIconActive : styles.upperTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Run')} style={activeTab == 'Run' ? styles.upperTabActive : styles.upperTab}>
          <MaterialIcons name='play-arrow'  style={activeTab == 'Run' ? styles.upperTabIconActive : styles.upperTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Settings')} style={activeTab == 'Settings' ? styles.upperTabActive : styles.upperTab}>
          <MaterialIcons name='settings'  style={activeTab == 'Settings' ? styles.upperTabIconActive : styles.upperTabIcon}/>
        </TouchableOpacity>
      </View>

      {activeTab=='Details' && <ViewApiDetails currentlyViewedApi={currentlyViewedApi}/>}
      {activeTab=='Run' && <RunAPIsScreen currentlyViewedApi={currentlyViewedApi}/>}
      {activeTab=='Settings' && <ApiSettingsScreen currentlyViewedApi={currentlyViewedApi}/>}
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  upperTabsContainer: {
    width: '95%',
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.background.secondary,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  upperTab: {
    backgroundColor: COLORS.background.primary,
    height: 40,
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upperTabActive: {
    backgroundColor: COLORS.primary,
    height: 40,
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upperTabIcon: {
    fontSize: 32,
    color: COLORS.primary,
  },
  upperTabIconActive: {
    fontSize: 32,
    color: COLORS.secondary
  },
  scrollContainer: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.primaryTheme,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text.primaryTheme,
  },
  emptyText: {
    color: COLORS.text.muted,
    fontStyle: 'italic',
  },
  keyValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  key: {
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  value: {
    color: COLORS.text.secondary,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});

export * from './RunApiScreen';