import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import COLORS from 'styles/core/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AddAPIModalNavigatorParamList } from 'types/navigation';
import { SaveAPICall } from 'scripts/LocalStorage';
import { APICall } from 'types/APIs';

export function AddApiModal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AddAPIModalNavigatorParamList>>();
  const [method, setMethod] = useState<string>('');

  const handleSubmit = async () => {
    if (!method) {
      Toast.show({
        type: 'error',
        text1: 'Missing Method',
        text2: 'Please select a valid method.',
      });
      return;
    }

    const data = {} as APICall;

    SaveAPICall(data);

    // continue with submission...
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
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Description" />
        <TextInput
          style={styles.input}
          placeholder="URI (ex. https://api.dev:3000/api/endpoint)"
        />
        <View pointerEvents="box-none">
          <RNPickerSelect
            onValueChange={value => setMethod(value)}
            placeholder={{ label: '-- Method --', value: null }}
            items={[
              { label: 'GET', value: 'GET' },
              { label: 'POST', value: 'POST' },
              { label: 'PUT', value: 'PUT' },
              { label: 'PATCH', value: 'PATCH' },
              { label: 'DELETE', value: 'DELETE' },
            ]}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
            value={method}
          />
        </View>

        <TouchableOpacity
          style={styles.formButton}
          onPress={() => navigation.navigate('AddRequestHeadersScreen')}
        >
          <Text style={styles.formButtonText}>Request Headers</Text>
          <MaterialIcons
            style={styles.formButtonIcon}
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
            style={styles.formButtonIcon}
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
    backgroundColor: COLORS.background.primary,
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: '#000',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: '#000',
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
  formButtonIcon: {
    display: 'flex',
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
