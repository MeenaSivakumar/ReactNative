import React, { useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator, { navigationRef } from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
