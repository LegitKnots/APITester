import React from 'react';
import { View } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { ViewApiModal } from './main';
import Header from 'components/ui/Header';
import { SavedTabNavigatorParamList } from 'types/navigation';


export default function ViewAPIModalNavigator() {
  const navigation = useNavigation();
  const route = useRoute();

  const { viewModalApi } = route.params as SavedTabNavigatorParamList;

  return (
      <View style={{ flex: 1 }}>
        <Header
          title={"API Call: " + viewModalApi.name}
          onBackPress={() => navigation.goBack()}
          leftIcon="close"
          topPadding={false}
        />
        <ViewApiModal currentlyViewedApi={viewModalApi} />
      </View>
  );
}
