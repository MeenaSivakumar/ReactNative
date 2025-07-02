import React, { useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator, { navigationRef } from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  useEffect(() => {
    const checkInitialIntent = async () => {
      if (Platform.OS === 'android') {
        const initialIntent = await NativeModules.IntentLauncher?.getInitialIntent?.();
        const screen = initialIntent?.screen;

        if (screen === 'food') navigationRef?.navigate('FoodLogs');
        else if (screen === 'movement') navigationRef?.navigate('Movements');
        else if (screen === 'activity') navigationRef?.navigate('Activity');
      }
    };

    checkInitialIntent();
  }, []);
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
