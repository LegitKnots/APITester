import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { APICall, SavedResponse } from 'types/APIs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SavedTabNavigatorParamList } from 'types/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'styles/core/colors';
import ResponseDetailsModal from '../ResponseDetailsModal';

type NavigationProp = NativeStackNavigationProp<SavedTabNavigatorParamList, 'SavedScreen'>;

type Props = {
  currentlyViewedApi: APICall;
};

export default function SavedResponsesScreen({ currentlyViewedApi }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const [selectedResponse, setSelectedResponse] = useState<SavedResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const responses = currentlyViewedApi.savedResponses ?? [];


  const openModal = (res: SavedResponse) => {
    setSelectedResponse(res);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {responses?.length > 0 ? (
          responses.map((res, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => openModal(res)}
            >
              <View style={styles.cardRow}>
                <Text style={styles.status}>
                  {res.responseStatus} {res.responseStatusText}
                </Text>
                <MaterialIcons name="chevron-right" size={20} color="#888" />
              </View>
              <Text style={styles.time}>
                {new Date(res.time).toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No saved responses for this API call.</Text>
        )}
      </ScrollView>

      <ResponseDetailsModal
        visible={modalVisible}
        response={selectedResponse}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  status: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.primary,
  },
  time: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.text.muted,
    marginTop: 40,
    fontStyle: 'italic',
  },
});
