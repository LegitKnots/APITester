import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import COLORS from 'styles/core/colors';
import { SaveAPICall } from 'scripts/LocalStorage';
import { useAPICallDraft } from 'context/APICallDraftContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AddAPIModalNavigatorParamList } from 'types/navigation';
import type { APICall } from 'types/APIs';

export function AddApiModal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AddAPIModalNavigatorParamList>>();
  const { draft } = useAPICallDraft();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [endpoint, setUri] = useState('');
  const [method, setMethod] = useState<APICall['method'] | ''>('');
  const pickerRef = useRef<any>(null);

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
      id: 'getFromScript',
      name,
      desc,
      endpoint,
      method: method as APICall['method'],
      headers: draft.headers ?? [],
      body: draft.body ?? [],
    };

    try {
      await SaveAPICall(data);
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

        <View>
          <TouchableOpacity
            onPress={() => pickerRef.current?.togglePicker?.()}
            activeOpacity={0.8}
            style={styles.pickerTouch}
          >
            <Text style={[styles.pickerText, !method && styles.placeholder]}>
              {method || '-- Method --'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#888" />
          </TouchableOpacity>

          <RNPickerSelect
            ref={pickerRef}
            onValueChange={setMethod}
            value={method}
            items={[
              { label: 'GET', value: 'GET' },
              { label: 'POST', value: 'POST' },
              { label: 'PUT', value: 'PUT' },
              { label: 'PATCH', value: 'PATCH' },
              { label: 'DELETE', value: 'DELETE' },
            ]}
            placeholder={{ label: '-- Method --', value: '' }}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                height: 0,
                width: 0,
                padding: 0,
                margin: 0,
              },
              inputAndroid: {
                height: 0,
                width: 0,
                padding: 0,
                margin: 0,
              },
              viewContainer: {
                height: 0,
                width: 0,
              },
              iconContainer: {
                height: 0,
                width: 0,
              },
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.formButton}
          onPress={() => navigation.navigate('AddRequestHeadersScreen')}
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
          onPress={() => navigation.navigate('AddRequestBodyScreen')}
        >
          <Text style={styles.formButtonText}>Request Body</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={COLORS.button.secondary.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add API</Text>
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
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 12,
    justifyContent: 'center',
  },
  pickerTouch: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.text.input,
  },
  placeholder: {
    color: '#888',
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

export * from './AddRequestHeadersScreen';
export * from './AddRequestBodyScreen';
