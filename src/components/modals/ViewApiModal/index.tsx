import React from 'react';
import { View } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { ViewApiModal } from './main';
import Header from 'components/ui/Header';
import {
  SavedTabNavigatorParamList,
  TabNavigatorParamList,
} from 'types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { APICall } from 'types/APIs';


type NavigationProp = NativeStackNavigationProp<TabNavigatorParamList, 'run'>;

function handleRunAPICall(APICallData: APICall, navigation: NavigationProp) {
  navigation.goBack();
  navigation.navigate('run', {
    screen: 'RunScreen',
    params: { APICallData },
  });
}

export default function ViewAPIModalNavigator() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const { viewModalApi } = route.params as SavedTabNavigatorParamList;

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'API Call: ' + viewModalApi.name}
        onBackPress={() => navigation.goBack()}
        leftIcon="close"
        topPadding={false}
        rightIcon={'play-circle'}
        onRightPress={() => handleRunAPICall(viewModalApi, navigation)}
      />
      <ViewApiModal currentlyViewedApi={viewModalApi} />
    </View>
  );
}
