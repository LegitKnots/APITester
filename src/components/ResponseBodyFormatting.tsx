import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import COLORS from 'styles/core/colors';

type BodyJsonProps = {
  responseBody: any; // Can narrow down based on your actual data structure
  type?: string | null; // Optional, in case content-type is undefined
};

export default function ResponseBodyFormatted({
  responseBody,
  type,
}: BodyJsonProps) {
  const isJson =
    type?.includes('application/json') || typeof responseBody === 'object';

  const renderEntry = (
    key: string | number,
    value: any,
    depth = 0,
  ): React.ReactNode => {
    const indent = depth * 16;

    if (Array.isArray(value)) {
      return (
        <View key={key} style={[styles.entryBlock, { paddingLeft: indent }]}>
          <Text style={styles.keyText}>{key}</Text>
          {value.map((item, idx) => renderEntry(`[${idx}]`, item, depth + 1))}
        </View>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <View key={key} style={[styles.entryBlock, { paddingLeft: indent }]}>
          <Text style={styles.objectText}>{key}: </Text>
          {Object.entries(value).map(([subKey, subVal]) =>
            renderEntry(subKey, subVal, depth + 1),
          )}
        </View>
      );
    }

    return (
      <View key={key} style={[styles.inlineRow, { paddingLeft: indent }]}>
        <Text style={styles.keyText}>{key}: </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.valueScrollContainer}
        >
          <Text selectable style={styles.valueText}>
            {value === null ? 'null' : String(value)}
          </Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isJson && typeof responseBody === 'object' ? (
          Object.entries(responseBody).map(([key, value]) =>
            renderEntry(key, value),
          )
        ) : (
          <ScrollView horizontal>
            <Text selectable style={styles.valueText}>
              {typeof responseBody === 'string'
                ? responseBody
                : JSON.stringify(responseBody, null, 2)}
            </Text>
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  entryBlock: {
    marginBottom: 6,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: 4,
  },
  objectText: {
    fontWeight: '600',
    fontSize: 15,
    color: COLORS.text.secondary,
    margin: 8,
    minWidth: 100,
  },
  keyText: {
    fontWeight: '600',
    fontSize: 15,
    color: COLORS.text.secondary,
    marginHorizontal: 8,
    minWidth: 100,
  },
  valueScrollContainer: {
    paddingVertical: 4,
    marginRight: 15,
    borderRadius: 6,
    minHeight: 32,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 15,
    marginRight: 10,
    color: COLORS.text.primary,
  },
});
