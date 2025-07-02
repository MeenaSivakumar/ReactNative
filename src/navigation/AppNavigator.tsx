// src/navigation/AppNavigator.tsx
import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import Home from '../screens/home/Home';
import FoodLog from '../screens/food_log/FoodLog';
import Movements from '../screens/movements/Movements';
import Activity from '../screens/activity/Activity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';



const Stack = createNativeStackNavigator();
const { IntentLauncher } = NativeModules;
const AppNavigator = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
  const checkInitialScreen = async () => {
      const screen = await IntentLauncher.getInitialScreen();
      if (screen && navigationRef.current) {
        setTimeout(() => {
          if (screen === 'food') navigationRef.current?.navigate('FoodLogs');
          if (screen === 'movement') navigationRef.current?.navigate('Movements');
          if (screen === 'activity') navigationRef.current?.navigate('Activity');
        }, 300);
      }
    };

    checkInitialScreen();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
