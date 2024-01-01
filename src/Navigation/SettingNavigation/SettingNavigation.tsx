import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SettingScreens } from '@/Screens';
import CustomHeaderBackButton from '@/Components/HeaderBackButton/HeaderBackButton';
import { Colors } from '@/Theme/Variables';
import { Settings } from '@/Screens/Settings';
import ChangePassword from '@/Screens/ChangePassword/ChangePassword';
import Allergenic from '@/Screens/Allergenic/Allergenic';

export type SettingStackParamList = {
  [SettingScreens.INFO]: undefined;
  [SettingScreens.ALLERGENIC_INGREDIENS]: undefined;
  [SettingScreens.CHANGE_PASSWORD]: undefined;
};

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

export const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerLeft: () => <CustomHeaderBackButton />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.PRIMARY_DARK,
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
      }}>
      <SettingStack.Screen
        name={SettingScreens.INFO}
        component={Settings}
        options={() => ({
          headerLeft: () => null,
        })}
      />
      <SettingStack.Screen
        name={SettingScreens.ALLERGENIC_INGREDIENS}
        component={Allergenic}
        options={{
          title: SettingScreens.ALLERGENIC_INGREDIENS,
        }}
      />
      <SettingStack.Screen
        name={SettingScreens.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{ title: SettingScreens.CHANGE_PASSWORD }}
      />
    </SettingStack.Navigator>
  );
};
