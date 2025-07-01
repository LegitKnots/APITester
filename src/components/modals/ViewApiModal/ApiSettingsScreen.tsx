import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { DeleteAPICall, DuplicateAPICall } from 'scripts/LocalStorage';
import COLORS from 'styles/core/colors';
import type { APICall } from 'types/APIs';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SavedTabNavigatorParamList } from 'types/navigation';
0;
type NavigationProp = NativeStackNavigationProp<
  SavedTabNavigatorParamList,
  'SavedScreen'
>;

type Props = {
  currentlyViewedApi: APICall;
};

async function handleDeleteAPICall(
  APICall: APICall,
  navigation: NavigationProp,
) {
  const delRes = await DeleteAPICall(APICall.id);

  if (!delRes) {
    console.log('Failed to delete');
    return;
  }
  navigation.goBack();
}

function handleEditAPI(APICall: APICall, navigation: NavigationProp) {

  navigation.navigate('editAPIModalNavigator', { editingApi: APICall });
}

async function handleDuplicateAPICall(
  APICall: APICall,
  navigation: NavigationProp,
) {
  const dupRes = await DuplicateAPICall(APICall);

  if (!dupRes) {
    console.log('Failed to duplicate');
    return;
  }
  navigation.goBack();
}

export default function ApiSettingsScreen({ currentlyViewedApi }: Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => handleEditAPI(currentlyViewedApi, navigation)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit API</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDuplicateAPICall(currentlyViewedApi, navigation)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Duplicate API</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteAPICall(currentlyViewedApi, navigation)}
          style={styles.buttonDestructive}
        >
          <Text style={styles.buttonText}>Delete API</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    padding: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDestructive: {
    backgroundColor: COLORS.background.delete,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text.primaryTheme,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 16,
  },
  keyValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  key: {
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  value: {
    color: COLORS.text.secondary,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  bodyViewer: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
  },
  codeBlock: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 13,
    color: COLORS.text.primary,
  },
});
