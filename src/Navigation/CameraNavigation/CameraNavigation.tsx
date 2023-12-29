import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CameraScreens } from '@/Screens';
import CameraScreen from '@/Screens/Camera/Camera';
import ScannerScreen from '@/Screens/Scanner/Scanner';
import CustomHeaderBackButton from '@/Components/HeaderBackButton/HeaderBackButton';
import { Colors } from '@/Theme/Variables';

export type CameraStackParamList = {
  [CameraScreens.SCANNER]: undefined;
  [CameraScreens.SCANNER_RESULT]: undefined;
};

const CameraStack = createNativeStackNavigator<CameraStackParamList>();

export const CameraStackScreen = () => {
  return (
    <CameraStack.Navigator
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
      <CameraStack.Screen
        name={CameraScreens.SCANNER}
        component={CameraScreen}
        options={{ title: '' }}
      />
      <CameraStack.Screen
        name={CameraScreens.SCANNER_RESULT}
        component={ScannerScreen}
        options={{ title: 'Scanner Result' }}
      />
    </CameraStack.Navigator>
  );
};
