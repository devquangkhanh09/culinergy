import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/Screens/Login';
import { Register } from '@/Screens/Register';
import { AuthScreens, RootScreens } from '@/Screens';
import { MainNavigator } from '../Main';
import { Welcome } from '@/Screens/Welcome';

export type AuthStackParamList = {
  [AuthScreens.LOGIN]: undefined;
  [AuthScreens.REGISTER]: undefined;
  [AuthScreens.WELCOME]: undefined;
  [RootScreens.MAIN]: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={AuthScreens.LOGIN} component={Login} />
      <AuthStack.Screen name={AuthScreens.REGISTER} component={Register} />
      <AuthStack.Screen name={RootScreens.MAIN} component={MainNavigator} />
      <AuthStack.Screen name={AuthScreens.WELCOME} component={Welcome} />
    </AuthStack.Navigator>
  );
};
