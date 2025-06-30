import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import COLORS from 'styles/core/colors';

export function AddRequestHeadersScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity>
        <Text>Hello</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
