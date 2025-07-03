export type AppSettings = {
  appVersion: string;
  autoSaveResponseSettings: AutoSaveSettings;
};

export type AutoSaveSettings =
  | { autoSave: true; askAlways: false }
  | { autoSave: false; askAlways: boolean };

export const defaultAppSettings = {
  appVersion: '1.0.3',
  autoSaveResponseSettings: {
    autoSave: true,
    askAlways: false,
  },
} as AppSettings;
