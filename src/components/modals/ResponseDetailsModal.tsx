import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SavedResponse } from 'types/APIs';
import COLORS from 'styles/core/colors';
import ResponseBodyFormatted from 'components/ResponseBodyFormatting';

type Props = {
  visible: boolean;
  onClose: () => void;
  response: SavedResponse | null;
};

export default function ResponseDetailsModal({
  visible,
  onClose,
  response,
}: Props) {
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const [showRaw, setShowRaw] = useState(false);

  if (!response) return null;

  const formatTime = (raw: string) => {
    const date = new Date(raw);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Saved Response</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <ScrollView contentContainerStyle={styles.bodyContent}>
          <View style={styles.metaContainer}>
            <Text style={styles.statusCode}>
              {response.responseStatus} {response.responseStatusText}
            </Text>
            <Text style={styles.timestamp}>{formatTime(response.time)}</Text>
          </View>

          {/* Headers Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Headers</Text>
              <TouchableOpacity onPress={() => setShowHeaders(!showHeaders)}>
                <Text style={styles.toggleText}>
                  {showHeaders ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
            {showHeaders && (
              <View style={styles.headersBox}>
                {Object.entries(response.responseHeaders).map(([key, val]) => (
                  <View key={key} style={styles.headerRow}>
                    <Text style={styles.headerKey}>{key}</Text>
                    <Text style={styles.headerValue}>{val}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Body Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Body</Text>
              <View style={styles.toggleButtons}>
                <TouchableOpacity onPress={() => setShowRaw(!showRaw)}>
                  <Text style={styles.toggleText}>
                    {showRaw ? 'View Formatted' : 'View Raw'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowBody(!showBody)} style={{ marginLeft: 12 }}>
                  <Text style={styles.toggleText}>
                    {showBody ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {showBody &&
              (showRaw ? (
                <View style={styles.rawBox}>
                  <Text style={styles.rawText}>
                    {JSON.stringify(response.responseBody, null, 2)}
                  </Text>
                </View>
              ) : (
                <ResponseBodyFormatted
                  responseBody={response.responseBody}
                  type={response.responseHeaders?.['content-type']}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
    backgroundColor: COLORS.background.secondary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  closeText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  bodyContent: {
    padding: 16,
  },
  metaContainer: {
    marginBottom: 16,
  },
  statusCode: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  toggleText: {
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 13,
  },
  toggleButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headersBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: COLORS.background.secondary,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
  },
  headerKey: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text.primary,
    flexShrink: 1,
    flex: 1,
  },
  headerValue: {
    fontSize: 13,
    color: COLORS.text.secondary,
    textAlign: 'right',
    flexShrink: 1,
    flex: 1,
  },
  rawBox: {
    padding: 12,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  rawText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
  },
});
