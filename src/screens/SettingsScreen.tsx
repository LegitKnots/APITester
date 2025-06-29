import Header from 'components/ui/Header';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import COLORS from 'styles/core/colors';

export default function RunAPIsScreen() {
  return (
    <View style={styles.mainView}>
      <Header title="App Settings" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Add your screen content here */}
        </View>
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
});