import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreens } from '@/Screens';
import { ChangePassword } from '@/Screens/ChangePassword';

export type SettingsStackParamList = {
  [SettingsScreens.CHANGE_PASSWORD]: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name={SettingsScreens.CHANGE_PASSWORD} component={ChangePassword} />
    </SettingsStack.Navigator>
  );
};
