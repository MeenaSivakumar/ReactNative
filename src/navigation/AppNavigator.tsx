// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import Home from '../screens/home/Home';
import FoodLog from '../screens/food_log/FoodLog';
import Movements from '../screens/movements/Movements';
import Activity from '../screens/activity/Activity';


export type RootStackParamList = {
  Home: undefined;
  FoodLogs: undefined;
  Movements: undefined;
  Activity: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const AppNavigator = () => {
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
