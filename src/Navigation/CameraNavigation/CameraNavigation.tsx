import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CameraScreens } from '@/Screens';
import CameraScreen from '@/Screens/Camera/Camera';
import ScannerScreen from '@/Screens/Scanner/Scanner';

export type CameraStackParamList = {
  [CameraScreens.SCANNER]: undefined;
  [CameraScreens.SCANNER_RESULT]: undefined;
};

const CameraStack = createNativeStackNavigator<CameraStackParamList>();

export const CameraStackScreen = () => {
  return (
    <CameraStack.Navigator screenOptions={{ headerShown: false }}>
      <CameraStack.Screen
        name={CameraScreens.SCANNER}
        component={CameraScreen}
      />
      <CameraStack.Screen
        name={CameraScreens.SCANNER_RESULT}
        component={ScannerScreen}
      />
    </CameraStack.Navigator>
  );
};
