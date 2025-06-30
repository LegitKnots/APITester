import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import COLORS from 'styles/core/colors';
import type { APICall } from 'types/APIs';

type Props = {
  currentlyViewedApi: APICall;
};

export default function ViewApiDetails({ currentlyViewedApi }: Props) {
  const { name, desc, endpoint, method, headers, body } = currentlyViewedApi;

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{desc}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endpoint</Text>
          <View style={styles.keyValueRow}>
            <Text style={styles.key}>URL</Text>
            <Text style={styles.value}>{endpoint}</Text>
          </View>
          <View style={styles.keyValueRow}>
            <Text style={styles.key}>Method</Text>
            <Text style={styles.value}>{method}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Headers</Text>
          {headers.length > 0 ? (
            headers.map((h, index) => (
              <View key={index} style={styles.keyValueRow}>
                <Text style={styles.key}>{h.key}</Text>
                <Text style={styles.value}>{h.value}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No headers set</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body</Text>
          {body.length > 0 ? (
            body.map((b, index) => (
              <View key={index} style={styles.keyValueRow}>
                <Text style={styles.key}>{b.key}</Text>
                <Text style={styles.value}>{b.value}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No body parameters</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.primaryTheme,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 16,
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
  emptyText: {
    color: COLORS.text.muted,
    fontStyle: 'italic',
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
});
