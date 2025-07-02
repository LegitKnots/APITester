import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Header from 'components/ui/Header';
import COLORS from 'styles/core/colors';
import { DeleteAllAPICalls } from 'scripts/APIStorage';
import { GetAppSettings, UpdateSetting } from 'scripts/AppSettings';
import type { AppSettings, AutoSaveSettings } from 'types/AppSettings';

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

    const newSetting: AutoSaveSettings = value
      ? { autoSave: true, askAlways: false }
      : { autoSave: false, askAlways: settings.autoSaveResponseSettings.askAlways };

    const success = await UpdateSetting('autoSaveResponseSettings', newSetting);
    if (success) {
      setSettings(prev => (prev ? { ...prev, autoSaveResponseSettings: newSetting } : prev));
    }
  };

  const handleAskToSaveChange = async (value: boolean) => {
    if (!settings) return;

    const prevSetting = settings.autoSaveResponseSettings;

    if (prevSetting.autoSave === true) return; // askAlways is locked out when autoSave is true

    const newSetting: AutoSaveSettings = {
      autoSave: false,
      askAlways: value,
    };

    const success = await UpdateSetting('autoSaveResponseSettings', newSetting);
    if (success) {
      setSettings(prev => (prev ? { ...prev, autoSaveResponseSettings: newSetting } : prev));
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
      ]
    );
  };

  const handleExportStorage = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allEntries = await AsyncStorage.multiGet(allKeys);
      const exportObj = Object.fromEntries(allEntries);
      const exportString = JSON.stringify(exportObj, null, 2);

      const path = `${RNFS.DocumentDirectoryPath}/storage-export.json`;
      await RNFS.writeFile(path, exportString, 'utf8');

      await Share.open({
        url: `file://${path}`,
        type: 'application/json',
        title: 'Export App Storage',
      });
    } catch (err) {
      console.error('Export error:', err);
      Alert.alert('Failed to export storage.');
    }
  };

  if (!settings) return null;

  const autoSaveSetting = settings.autoSaveResponseSettings;
  const autoSaveEnabled = autoSaveSetting.autoSave;
  const askAlways = autoSaveEnabled ? false : autoSaveSetting.askAlways;

  return (
    <View style={styles.mainView}>
      <Header title="App Settings" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>API Response Settings</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Auto Save</Text>
            <Switch
              value={autoSaveEnabled}
              onValueChange={handleAutoSaveChange}
              trackColor={{ false: '#ccc', true: COLORS.primary }}
              thumbColor={autoSaveEnabled ? COLORS.secondary : '#fff'}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Ask To Save</Text>
            <Switch
              value={askAlways}
              onValueChange={handleAskToSaveChange}
              trackColor={{ false: '#ccc', true: COLORS.primary }}
              thumbColor={askAlways ? COLORS.secondary : '#fff'}
              disabled={autoSaveEnabled}
            />
          </View>

          <Text style={styles.sectionTitle}>Storage</Text>

          <TouchableOpacity style={styles.button} onPress={handleExportStorage}>
            <Text style={styles.buttonText}>Export All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={handleClearStorage}
          >
            <Text style={styles.buttonText}>Clear All Storage</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.value}>{settings.appVersion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Environment</Text>
            <Text style={styles.value}>{settings.environment}</Text>
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
  value: {
    fontSize: 14,
    color: COLORS.text.secondary,
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
