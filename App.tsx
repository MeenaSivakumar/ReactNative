/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import {

} from 'react-native/Libraries/NewAppScreen';
import GroceryPage from './src/pages/grocery/GroceryPage';

function App(): React.JSX.Element {
  return <SafeAreaView>
<GroceryPage/>
  </SafeAreaView>;
}

export default App;
