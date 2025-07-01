import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SavedTabNavigatorParamList } from 'types/navigation';
import type { APICall } from 'types/APIs';
import Header from 'components/ui/Header';
import COLORS from 'styles/core/colors';
import { DeleteAPICall, GetAllAPICalls } from 'scripts/LocalStorage';

export default function SavedAPIsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SavedTabNavigatorParamList>>();

  const [savedAPIs, setSavedAPIs] = useState<Record<string, APICall>>({});

  const loadSavedAPIs = async () => {
    try {
      const allAPIs = await GetAllAPICalls();
      if (!allAPIs) throw new Error('Local storage returned null');

      const apiMap: Record<string, APICall> = {};
      for (const api of allAPIs) {
        apiMap[api.id] = api;
      }
      setSavedAPIs(apiMap);
    } catch (error) {
      console.error('Failed to load saved APIs:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadSavedAPIs);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: string) => {
    try {
      await DeleteAPICall(id);
      await loadSavedAPIs();
    } catch (error) {
      console.error('Failed to delete API call:', error);
    }
  };

  const handleOpenAddApiModal = () => {
    navigation.navigate('AddApiModal');
  };

  const renderRightActions = (api: APICall) => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity
        style={styles.fullDeleteAction}
        onPress={() =>
          Alert.alert(
            'Delete API',
            `Are you sure you want to delete "${api.name}"?`,
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => handleDelete(api.id),
              },
            ]
          )
        }
      >
        <MaterialIcons name="delete" size={28} color="#fff" />
        <Text style={styles.swipeDeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <Header
        title="Saved API Calls"
        rightIcon="add"
        onRightPress={handleOpenAddApiModal}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          {Object.entries(savedAPIs).length ===  0? (
            <Text style={styles.emptyText}>No saved API calls yet.</Text>
          ) : (
            Object.entries(savedAPIs).map(([key, api]) => (
              <Swipeable
                key={key}
                renderRightActions={() => renderRightActions(api)}
                rightThreshold={40}
                overshootRight={false}
                friction={2}
                overshootFriction={5}                

              >
                <View style={styles.cardContainer}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate('viewAPIModal', { viewModalApi: api })
                    }
                  >
                    <View style={styles.cardRow}>
                      <Text style={styles.cardTitle}>{api.name}</Text>
                      <MaterialIcons
                        name="chevron-right"
                        size={20}
                        color="#777"
                      />
                    </View>
                    <Text style={styles.cardSubtitle}>
                      {api.method} • {api.endpoint}
                    </Text>
                    {api.desc ? (
                      <Text style={styles.cardDesc}>{api.desc}</Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </Swipeable>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyText: {
    color: COLORS.text.muted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 32,
  },
  cardContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    padding: 16,
    borderRadius: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  cardDesc: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  rightActionContainer: {
    backgroundColor: COLORS.background.delete,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 12,
    marginBottom: 12,
    paddingRight: 8,
    flex: 1,
  },
  fullDeleteAction: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeDeleteText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
