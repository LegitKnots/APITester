import Header from 'components/ui/Header';
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Modal } from 'react-native';
import COLORS from 'styles/core/colors';
import AddAPIModalNavigator from 'navigation/AddAPIModalNavigator';

export default function RunAPIsScreen() {

  const [addModalVisible, setAddModalVisible] = useState(false);
  
  return (

    <View style={styles.mainView}>
      <Header title="Run API Calls" rightIcon={'add'} onRightPress={() => setAddModalVisible(true)} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Add your screen content here */}
          <Dropdown/>
        </View>
      </SafeAreaView>



    {addModalVisible && (
        <Modal
          visible={addModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setAddModalVisible(false)}
          
        >
          <AddAPIModalNavigator onClose={() => setAddModalVisible(false)} />
        </Modal>
      )}

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
});


import RNPickerSelect from 'react-native-picker-select';

export const Dropdown = () => {
  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
  );
};