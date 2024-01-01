import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CameraScreens } from '@/Screens';
import CameraScreen from '@/Screens/Camera/Camera';
import ScannerScreen from '@/Screens/ScannerResult/ScannerResult';
import CustomHeaderBackButton from '@/Components/HeaderBackButton/HeaderBackButton';
import { Colors } from '@/Theme/Variables';
import Recommend from '@/Screens/Recommend/Recommend';

export type CameraStackParamList = {
  [CameraScreens.SCANNER]: undefined;
  [CameraScreens.SCANNER_RESULT]: undefined;
  [CameraScreens.RECOMMENDATION]: undefined;
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
        options={{ title: CameraScreens.SCANNER_RESULT }}
      />
      <CameraStack.Screen
        name={CameraScreens.RECOMMENDATION}
        component={Recommend}
        options={{ title: CameraScreens.RECOMMENDATION }}
      />
    </CameraStack.Navigator>
  );
};
