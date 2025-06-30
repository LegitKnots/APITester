import React from 'react';
import { View } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { ViewApiModal } from './main';
import Header from 'components/ui/Header';
import type { APICall } from 'types/APIs';

type ViewAPIModalNavigatorParam = {
  viewModalApi: APICall;
};


export default function ViewAPIModalNavigator() {
  const navigation = useNavigation();
  const route = useRoute();

  const { viewModalApi } = route.params as ViewAPIModalNavigatorParam;

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
