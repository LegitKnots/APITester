import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, defaultAppSettings } from 'types/AppSettings';


// Gets all app settings -- Resets to default on failure to avoid potential errors
export async function GetAppSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem('appSettings');
  const res = raw ? (JSON.parse(raw) as AppSettings) : null;
  if (res === null) {
    return ResetAppSettings();
  }
  return res;
}


// Resets all app settigns to defined defaults and returns them with it
export async function ResetAppSettings(): Promise<AppSettings> {
  const defaultAppSettingsJSON = JSON.stringify(defaultAppSettings);
  await AsyncStorage.setItem('appSettings', defaultAppSettingsJSON);
  return defaultAppSettings;
}


export async function UpdateSetting<K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): Promise<boolean> {
  try {
    const currentAppSettings = await GetAppSettings();
    const updatedSettings: AppSettings = {
      ...(currentAppSettings ?? {}),
      [key]: value,
    };

    await AsyncStorage.setItem('appSettings', JSON.stringify(updatedSettings));
    return true;
  } catch (error) {
    console.error('Failed to update setting:', error);
    return false;
  }
}