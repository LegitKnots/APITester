export type AppSettings = {
  appVersion: string;
  environment: 'Development' | 'Release';
  autoSaveResponseSettings: AutoSaveSettings;
};

export type AutoSaveSettings =
  | { autoSave: true; askAlways: false }
  | { autoSave: false; askAlways: boolean };

export const defaultAppSettings = {
  appVersion: '1.0.1',
  environment: 'Development',
  autoSaveResponseSettings: {
    autoSave: true,
    askAlways: false,
  },
} as AppSettings;
