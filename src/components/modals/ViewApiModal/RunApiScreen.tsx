import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import RunAPICall from 'scripts/RunAPICall';
import COLORS from 'styles/core/colors';
import type { APICall, RunAPICallResult } from 'types/APIs';

type Props = {
  currentlyViewedApi: APICall;
};

export default function RunApiScreen({ currentlyViewedApi }: Props) {
  const [responseData, setResponseData] = useState<RunAPICallResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(true);

  async function handleRunApiCall() {
    setLoading(true);
    setResponseData(null);
    try {
      const result = await RunAPICall(currentlyViewedApi);
      setResponseData(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleRunApiCall} style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Run API Call</Text>
          )}
        </TouchableOpacity>

        {responseData && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.keyValueRow}>
                <Text style={styles.key}>Code</Text>
                <Text style={styles.value}>
                  {responseData.responseStatus} {responseData.responseStatusText}
                </Text>
              </View>
            </View>

            {/* Headers */}
            <View style={styles.section}>
              <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Headers</Text>
                <TouchableOpacity onPress={() => setShowHeaders((prev) => !prev)}>
                  <Text style={styles.toggleText}>
                    {showHeaders ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {showHeaders &&
                Object.entries(responseData.responseHeaders).map(([key, value]) => (
                  <View key={key} style={styles.keyValueRow}>
                    <Text style={styles.key}>{key}</Text>
                    <Text style={styles.value}>{value}</Text>
                  </View>
                ))}
            </View>

            {/* Body */}
            <View style={styles.section}>
              <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Response Body</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity onPress={() => setShowRaw((prev) => !prev)}>
                    <Text style={styles.toggleText}>
                      {showRaw ? 'View Pretty' : 'View Raw'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowBody((prev) => !prev)}>
                    <Text style={styles.toggleText}>
                      {showBody ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showBody && (
                <ScrollView
                  style={styles.bodyViewer}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <Text style={styles.codeBlock}>
                    {showRaw
                      ? JSON.stringify(responseData.responseBody)
                      : JSON.stringify(responseData.responseBody, null, 2)}
                  </Text>
                </ScrollView>
              )}
            </View>
          </>
        )}
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
