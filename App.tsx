/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, View } from 'react-native';
import MainNavigator from "navigation/MainNavigator"

function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle='light-content' />
      <MainNavigator/>
    </View>
  );
}

export default App;
