import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './Main';
import { RootScreens } from '@/Screens';
import { AuthStackScreen } from './AuthNavigation/AuthNavigation';
import { CameraStackScreen } from './CameraNavigation/CameraNavigation';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.AUTH]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator
        id="root"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <RootStack.Screen name={RootScreens.AUTH} component={AuthStackScreen} />
        <RootStack.Screen name={RootScreens.MAIN} component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
