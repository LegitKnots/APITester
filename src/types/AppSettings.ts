export type AppSettings = {
  appVersion: string;
  autoSaveResponses: boolean;
};

export const defaultAppSettings = {
  appVersion: '1.0.3',
  autoSaveResponses: true,
} as AppSettings;
