import { Headers, Body, APICall } from './APIs';

export type MainNavigatorParamList = {
  TabNavigator: undefined;
};

export type TabNavigatorParamList = {
  run: { screen: 'RunScreen'; params: { APICallData: APICall } } | undefined;
  saved: undefined;
  settings: undefined;
};

export type RunTabNavigatorParamList = {
  RunScreen: { APICallData?: APICall } | undefined;
  AddApiModal: undefined;
  addApiModalNavigator: undefined;
};
export type SavedTabNavigatorParamList = {
  SavedScreen: undefined;
  addApiModalNavigator: undefined;
  viewAPIModal: { viewModalApi: APICall | null };
  viewModalApi: APICall;
  editAPIModalNavigator: { editingApi: APICall };
};
export type SettingsTabNavigatorParamList = {
  SettingsScreen: undefined;
};

export type AddAPIModalNavigatorParamList = {
  AddApiModal: undefined;
  AddRequestHeadersScreen: Headers[] | undefined;
  AddRequestBodyScreen: Body[] | undefined;
};

export type EditAPIModalNavigatorParamList = {
  EditApiModal: { editingApi: APICall };
  EditRequestHeadersScreen: Headers[] | undefined;
  EditRequestBodyScreen: Body[] | undefined;
};