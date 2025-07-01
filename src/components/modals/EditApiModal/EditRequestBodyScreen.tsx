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

export function EditRequestBodyScreen() {
  const navigation = useNavigation();
  const { draft, setDraft } = useAPICallDraft();

  const [body, setBody] = useState(draft.body ?? []);

  const handleAddField = () => {
    setBody([...body, { key: '', value: '' }]);
  };

  const handleChangeField = (
    index: number,
    field: 'key' | 'value',
    text: string,
  ) => {
    const updated = [...body];
    updated[index][field] = text;
    setBody(updated);
  };

  const handleRemoveField = (index: number) => {
    const updated = [...body];
    updated.splice(index, 1);
    setBody(updated);
  };

  const handleSaveAndGoBack = () => {
    setDraft(prev => ({ ...prev, body }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ModalSubHeader
        title="Add Request Body"
        onBackPress={handleSaveAndGoBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {body.map((field, index) => (
          <View key={index} style={styles.headerRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Key"
              value={field.key}
              onChangeText={text => handleChangeField(index, 'key', text)}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Value"
              value={field.value}
              onChangeText={text => handleChangeField(index, 'value', text)}
            />
            <TouchableOpacity
              onPress={() => handleRemoveField(index)}
              style={styles.deleteButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons name="close" size={22} color="#999" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddField}
          style={styles.addHeaderButton}
        >
          <Text style={styles.addHeaderText}>+ Add Body Field</Text>
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
    color: '#000',
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
