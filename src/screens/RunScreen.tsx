import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RunTabNavigatorParamList } from 'types/navigation';
import type { APICall, RunAPICallResult } from 'types/APIs';
import RunAPICall from 'scripts/RunAPICall';

import Header from 'components/ui/Header';
import COLORS from 'styles/core/colors';
import ResponseBodyFormatted from 'components/ResponseBodyFormatting';
import { GetAppSettings } from 'scripts/AppSettings';
import { SaveAPICallResponse } from 'scripts/APIStorage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RunAPIsScreenRouteProp = RouteProp<RunTabNavigatorParamList, 'RunScreen'>;

export default function RunAPIsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RunTabNavigatorParamList>>();

  const route = useRoute<RunAPIsScreenRouteProp>();
  const passedApiCall: APICall | undefined = route.params?.APICallData;
  const [responseData, setResponseData] = useState<RunAPICallResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [showHeaders, setShowHeaders] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const handleOpenAddApiModal = () => {
    navigation.navigate('addApiModalNavigator');
  };
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await GetAppSettings();
      setAutoSaveEnabled(settings.autoSaveResponseSettings?.autoSave ?? false);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    setResponseData(null);
  }, [navigation]);

  async function handleRunApiCall() {
    setLoading(true);
    setResponseData(null);
    try {
      const result = await RunAPICall(passedApiCall as APICall);

      const settings = await GetAppSettings();
      if (settings.autoSaveResponseSettings?.autoSave && passedApiCall?.id) {
        SaveAPICallResponse(passedApiCall.id, result);
      }

      setResponseData(result);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveResponse() {
    if (passedApiCall?.id && responseData) {
      SaveAPICallResponse(passedApiCall.id, responseData);
    }
  }

  return (
    <View style={styles.mainView}>
      <Header
        title="Run API Calls"
        rightIcon="add"
        onRightPress={handleOpenAddApiModal}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.content}>
          {!passedApiCall ? (
            <View>
              <Text style={styles.emptyText}>No API Call Loaded</Text>
              <Text style={styles.emptyText}>
                Open an API Call in the Saved tab and click the run button at
                the top
              </Text>
              <Text style={styles.emptyText}>
                Or click the add button above to create a new API Call
              </Text>
            </View>
          ) : (
            <View style={styles.apiCard}>
              <Text style={styles.apiTitle}>{passedApiCall.name}</Text>
              <Text style={styles.apiSubtitle}>{passedApiCall.desc}</Text>
              <Text style={styles.apiDetail}>
                Method: {passedApiCall.method}
              </Text>
              <Text style={styles.apiDetail}>
                Endpoint: {passedApiCall.endpoint}
              </Text>

              {/* Placeholder for request preview and runner */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.runButton}
                  onPress={() => handleRunApiCall()}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.runButtonText}>Run API Call</Text>
                  )}
                </TouchableOpacity>
                {responseData && autoSaveEnabled === false && (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveResponse}
                  >
                    <MaterialIcons
                      style={styles.saveIcon}
                      name="save"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {responseData && (
                <>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status</Text>
                    <View style={styles.inlineRow}>
                      <ScrollView
                        horizontal
                        contentContainerStyle={styles.valueScrollContainer}
                        showsHorizontalScrollIndicator={false}
                      >
                        <Text style={styles.keyText}>Code</Text>
                        <Text style={styles.valueText}>
                          {responseData.responseStatus}{' '}
                          {responseData.responseStatusText}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>

                  {/* Headers */}
                  <View style={styles.section}>
                    <View style={styles.headerRow}>
                      <Text style={styles.sectionTitle}>Headers</Text>
                      <TouchableOpacity
                        onPress={() => setShowHeaders(prev => !prev)}
                      >
                        <Text style={styles.toggleText}>
                          {showHeaders ? 'Hide' : 'Show'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {showHeaders &&
                      Object.entries(responseData.responseHeaders).map(
                        ([key, value]) => (
                          <View key={key} style={styles.inlineRow}>
                            <Text style={styles.keyText}>{key}</Text>
                            <ScrollView
                              horizontal
                              contentContainerStyle={
                                styles.valueScrollContainer
                              }
                              showsHorizontalScrollIndicator={false}
                            >
                              <Text style={styles.valueText}>{value}</Text>
                            </ScrollView>
                          </View>
                        ),
                      )}
                  </View>

                  {/* Body */}
                  <View style={styles.section}>
                    <View style={styles.headerRow}>
                      <Text style={styles.sectionTitle}>Response Body</Text>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                          onPress={() => setShowRaw(prev => !prev)}
                        >
                          <Text style={styles.toggleText}>
                            {showRaw ? 'View Pretty' : 'View Raw'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setShowBody(prev => !prev)}
                        >
                          <Text style={styles.toggleText}>
                            {showBody ? 'Hide' : 'Show'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {showBody && (
                      <ScrollView>
                        {showRaw ? (
                          <Text style={styles.codeBlock}>
                            {JSON.stringify(responseData.responseBody, null, 2)}
                          </Text>
                        ) : (
                          <ResponseBodyFormatted
                            responseBody={responseData.responseBody}
                            type={
                              responseData.responseHeaders?.['content-type']
                            }
                          />
                        )}
                      </ScrollView>
                    )}
                  </View>
                </>
              )}
            </View>
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
    flex: 1,
    padding: 16,
  },
  emptyText: {
    color: COLORS.text.muted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 32,
  },
  apiCard: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  apiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  apiSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  apiDetail: {
    fontSize: 13,
    color: COLORS.text.primary,
    marginBottom: 6,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 12, // for spacing between buttons if supported, or use marginRight
  },
  runButton: {
    flex: 1,
    backgroundColor: COLORS.button.primary.background,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    flex: 0.3,
    backgroundColor: COLORS.button.blue.background,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runButtonText: {
    color: COLORS.button.primary.text,
    fontWeight: '600',
    fontSize: 16,
  },
  saveIcon: {
    color: COLORS.button.primary.text,
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
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flexShrink: 0,
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
