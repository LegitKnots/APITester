import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SavedTabNavigatorParamList } from 'types/navigation';
import type { APICall } from 'types/APIs';
import Header from 'components/ui/Header';
import COLORS from 'styles/core/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SavedAPIsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<SavedTabNavigatorParamList>>();

  const [savedAPIs, setSavedAPIs] = useState<Record<string, APICall>>({});

  useEffect(() => {
    const loadSavedAPIs = async () => {
      try {
        const raw = await AsyncStorage.getItem('SavedAPICalls');
        const parsed: Record<string, APICall> = raw ? JSON.parse(raw) : {};
        setSavedAPIs(parsed);
      } catch (error) {
        console.error('Failed to load saved APIs:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadSavedAPIs);
    return unsubscribe;
  }, [navigation]);

  const handleOpenAddApiModal = () => {
    navigation.navigate('AddApiModal');
  };

  return (
    <View style={styles.mainView}>
      <Header
        title="Saved API Calls"
        rightIcon="add"
        onRightPress={handleOpenAddApiModal}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          {Object.entries(savedAPIs).length === 0 ? (
            <Text style={styles.emptyText}>No saved API calls yet.</Text>
          ) : (
            Object.entries(savedAPIs).map(([key, api]) => (
              <TouchableOpacity
                key={key}
                style={styles.card}
                onPress={() => navigation.navigate('viewAPIModal', { viewModalApi: api })}
              >
                <View style={styles.cardRow}>
                  <Text style={styles.cardTitle}>{api.name}</Text>
                  <MaterialIcons name="chevron-right" size={20} color="#777" />
                </View>
                <Text style={styles.cardSubtitle}>{api.method} • {api.endpoint}</Text>
                {api.desc ? <Text style={styles.cardDesc}>{api.desc}</Text> : null}
              </TouchableOpacity>
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
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: COLORS.background.secondary ?? '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
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
    color: '#555',
  },
  cardDesc: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});
