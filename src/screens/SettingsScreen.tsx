import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Header from 'components/ui/Header';
import COLORS from 'styles/core/colors';
import { DeleteAllAPICalls } from 'scripts/APIStorage';
import { GetAppSettings, UpdateSetting } from 'scripts/AppSettings';
import type { AppSettings } from 'types/AppSettings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const loaded = await GetAppSettings();
      setSettings(loaded);
    };
    fetchSettings();
  }, []);

  const handleAutoSaveChange = async (value: boolean) => {
    if (!settings) return;

    const success = await UpdateSetting('autoSaveResponses', value);
    if (success) {
      setSettings(prev =>
        prev ? { ...prev, autoSaveResponses: value } : prev,
      );
    }
  };

  const handleClearStorage = async () => {
    Alert.alert(
      'Clear All Storage',
      'Are you sure you want to delete all saved data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await DeleteAllAPICalls();
            Alert.alert('Storage cleared.');
          },
        },
      ],
    );
  };

  const handleExportStorage = async () => {
    try {
      const allEntries = await AsyncStorage.getItem('SavedAPICalls');
      //const exportObj = Object.fromEntries(allEntries);
      const exportString = JSON.stringify(allEntries, null, 2);

      const path = `${RNFS.DocumentDirectoryPath}/storage-export.json`;
      await RNFS.writeFile(path, exportString, 'utf8');

      await Share.open({
        url: `file://${path}`,
        type: 'application/json',
        title: 'Export App Storage',
      });
    } catch (err) {
      console.error('Export error:', err);
      if (typeof err === 'string' && !err.includes('User did not share'))
        Alert.alert('Failed to export API calls.');
    }
  };

  if (!settings) return null;

  const autoSaveEnabled = settings.autoSaveResponses;

  return (
    <View style={styles.mainView}>
      <Header title="Settings" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>API Response Settings</Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Auto Save</Text>
              <Text style={styles.description}>
                Automatically save server responses
              </Text>
            </View>
            <Switch
              value={autoSaveEnabled}
              onValueChange={handleAutoSaveChange}
              trackColor={{ false: '#ccc', true: COLORS.primary }}
              thumbColor={autoSaveEnabled ? COLORS.secondary : '#fff'}
            />
          </View>

          <Text style={styles.sectionTitle}>Storage</Text>

          <TouchableOpacity style={styles.button} onPress={handleExportStorage}>
            <Text style={styles.buttonText}>Export All API Calls</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={handleClearStorage}
          >
            <Text style={styles.buttonText}>Delete All API Calls</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.value}>{settings.appVersion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Environment</Text>
            <Text style={styles.value}>
              {__DEV__ ? 'Development' : 'Release'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Source Code</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://github.com/LegitKnots/APITester')
              }
            >
              <Text style={styles.valueLink}>
                GitHub <MaterialIcons name="open-in-new" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.text.primaryTheme,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  description: {
    fontSize: 12,
    color: COLORS.text.muted,
  },
  value: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  valueLink: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDanger: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
});
