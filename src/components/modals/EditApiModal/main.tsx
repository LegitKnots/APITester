import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import COLORS from 'styles/core/colors';
import { UpdateAPICall } from 'scripts/APIStorage';
import { useAPICallDraft } from 'context/APICallDraftContext';
import type { APICall } from 'types/APIs';
import type {
  EditAPIModalNavigatorParamList,
} from 'types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function EditApiModal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<EditAPIModalNavigatorParamList>>();
  const route = useRoute<RouteProp<EditAPIModalNavigatorParamList, 'EditApiModal'>>();
  const { editingApi } = route.params;

  const { draft, setDraft } = useAPICallDraft();

  const [name, setName] = useState(editingApi.name);
  const [desc, setDesc] = useState(editingApi.desc);
  const [endpoint, setUri] = useState(editingApi.endpoint);
  const [method, setMethod] = useState<
    'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | ''
  >(editingApi.method);

  useEffect(() => {
    setDraft(editingApi);
  }, []);

  const handleSubmit = async () => {
    const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    const missingField = !validMethods.includes(method)
      ? 'Method'
      : !name
      ? 'Name'
      : !endpoint
      ? 'URI'
      : '';

    if (missingField) {
      Toast.show({
        type: 'error',
        text1: `Missing ${missingField}`,
        text2: `Please enter a valid ${missingField.toLowerCase()}.`,
      });
      return;
    }

    const data: APICall = {
      id: editingApi.id,
      name,
      desc,
      endpoint,
      method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      headers: draft.headers ?? [],
      body: draft.body ?? [],
      savedResponses: editingApi.savedResponses,
    };

    try {
      await UpdateAPICall(data);
      Toast.show({ type: 'success', text1: 'API Call Saved' });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Save Failed',
        text2: 'Something went wrong while saving.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={desc}
          onChangeText={setDesc}
        />
        <TextInput
          style={styles.input}
          placeholder="URI (ex. https://api.dev:3000/api/endpoint)"
          value={endpoint}
          onChangeText={setUri}
        />

        <RNPickerSelect
          onValueChange={value => setMethod(value)}
          placeholder={{ label: '-- Method --', value: '' }}
          items={[
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'PATCH', value: 'PATCH' },
            { label: 'DELETE', value: 'DELETE' },
          ]}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
          }}
          value={method}
        />

        <TouchableOpacity
          style={styles.formButton}
          onPress={() => navigation.navigate('EditRequestHeadersScreen')}
        >
          <Text style={styles.formButtonText}>Request Headers</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={COLORS.button.secondary.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.formButton}
          onPress={() => navigation.navigate('EditRequestBodyScreen')}
        >
          <Text style={styles.formButtonText}>Request Body</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={COLORS.button.secondary.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update API</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: COLORS.text.input,
  },
  formButton: {
    backgroundColor: COLORS.button.secondary.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#555',
    marginBottom: 12,
    alignItems: 'center',
  },
  formButtonText: {
    color: COLORS.button.secondary.text,
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.button.primary.background,
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.button.primary.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

export * from './EditRequestHeadersScreen';
export * from './EditRequestBodyScreen';
