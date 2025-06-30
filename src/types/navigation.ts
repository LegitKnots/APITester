import {Headers, Body, APICall} from "./APIs"

export type MainNavigatorParamList = {
    TabNavigator: undefined
}

export type TabNavigatorParamList = {
    run: undefined
    saved: undefined
    settings: undefined
}

export type RunTabNavigatorParamList = {
    RunScreen: undefined
    AddApiModal: undefined
}
export type SavedTabNavigatorParamList = {
    SavedScreen: undefined
    AddApiModal: undefined
    viewAPIModal: { viewModalApi: APICall | null };
}
export type SettingsTabNavigatorParamList = {
    SettingsScreen: undefined
}

export type AddAPIModalNavigatorParamList = {
    AddApiModal: undefined
    AddRequestHeadersScreen: Headers[] | undefined
    AddRequestBodyScreen: Body[] | undefined
}

export type ViewAPIModalNavigatorParamList = {
    ViewApiModal: undefined
    RunApiScreen: undefined
    currentlyViewedApi: APICall;
}