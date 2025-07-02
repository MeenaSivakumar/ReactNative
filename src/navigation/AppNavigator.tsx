// src/navigation/AppNavigator.tsx
import React, {useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Home from '../screens/home/Home';
import FoodLog from '../screens/food_log/FoodLog';
import Movements from '../screens/movements/Movements';
import Activity from '../screens/activity/Activity';
import { NativeModules} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  FoodLogs: undefined;
  Movements: undefined;
  Activity: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

useEffect(() => {
  const checkIntent = async () => {
    try {
      const result = await NativeModules.IntentLauncher.getInitialIntent();
      if (result?.screen) {
        navigationRef.current?.navigate(result.screen);
      }
    } catch (e) {
      console.error("Error getting initial intent:", e);
    }
  };

  checkIntent();
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FoodLogs" component={FoodLog} />
        <Stack.Screen name="Movements" component={Movements} />
        <Stack.Screen name="Activity" component={Activity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
