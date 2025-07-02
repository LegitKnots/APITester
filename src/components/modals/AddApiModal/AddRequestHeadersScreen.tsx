import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalSubHeader from 'components/ui/ModalSubHeader';
import COLORS from 'styles/core/colors';
import { useAPICallDraft } from 'context/APICallDraftContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function AddRequestHeadersScreen() {
  const navigation = useNavigation();
  const { draft, setDraft } = useAPICallDraft();

  const [headers, setHeaders] = useState(draft.headers ?? []);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleChangeHeader = (
    index: number,
    field: 'key' | 'value',
    text: string,
  ) => {
    const updated = [...headers];
    updated[index][field] = text;
    setHeaders(updated);
  };

  const handleRemoveHeader = (index: number) => {
    const updated = [...headers];
    updated.splice(index, 1);
    setHeaders(updated);
  };

  const handleSaveAndGoBack = () => {
    setDraft(prev => ({ ...prev, headers }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ModalSubHeader
        title="Add Request Headers"
        onBackPress={handleSaveAndGoBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {headers.map((header, index) => (
          <View key={index} style={styles.headerRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Key"
              value={header.key}
              onChangeText={text => handleChangeHeader(index, 'key', text)}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Value"
              value={header.value}
              onChangeText={text => handleChangeHeader(index, 'value', text)}
            />
            <TouchableOpacity
              onPress={() => handleRemoveHeader(index)}
              style={styles.deleteButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons name="close" size={22} color="#999" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddHeader}
          style={styles.addHeaderButton}
        >
          <Text style={styles.addHeaderText}>+ Add Header</Text>
        </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    color: COLORS.text.input,
  },
  deleteButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHeaderButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.button.secondary.background,
    alignItems: 'center',
  },
  addHeaderText: {
    color: COLORS.button.secondary.text,
    fontWeight: '600',
  },
});
