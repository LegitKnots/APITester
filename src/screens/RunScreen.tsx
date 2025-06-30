import Header from 'components/ui/Header';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import COLORS from 'styles/core/colors';
import { useNavigation } from '@react-navigation/native';
import type { RunTabNavigatorParamList } from 'types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function RunAPIsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RunTabNavigatorParamList>>();

  const handleOpenAddApiModal = () => {
    navigation.navigate('AddApiModal'); // make sure this route is registered!
  };

  return (
    <View style={styles.mainView}>
      <Header
        title="Run API Calls"
        rightIcon="add"
        onRightPress={handleOpenAddApiModal}
      />
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
