import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CameraScreens } from '@/Screens';
import CameraScreen from '@/Screens/Camera/Camera';
import ScannerScreen from '@/Screens/ScannerResult/ScannerResult';
import CustomHeaderBackButton from '@/Components/HeaderBackButton/HeaderBackButton';
import { Colors } from '@/Theme/Variables';
import Recommend from '@/Screens/Recommend/Recommend';
import IngredientDetail from '@/Screens/IngredientDetail/IngredientDetail';
import RecipeDetail from '@/Screens/RecipeDetail/RecipeDetail';
import {
  useNavigation,
  CommonActions,
  useIsFocused,
} from '@react-navigation/native';

export type CameraStackParamList = {
  [CameraScreens.SCANNER]: undefined;
  [CameraScreens.SCANNER_RESULT]: undefined;
  [CameraScreens.RECOMMENDATION]: undefined;
  [CameraScreens.INGREDIENT_DETAIL]: undefined;
  [CameraScreens.RECIPE_DETAIL]: undefined;
};

const CameraStack = createNativeStackNavigator<CameraStackParamList>();

export const CameraStackScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Fix reset camera when clicking back to home button
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      if (isFocused) {
        navigation.dispatch(
          CommonActions.navigate({
            name: CameraScreens.SCANNER,
            params: {},
            key: `${CameraScreens.SCANNER}-${Date.now()}`,
          })
        );
      }
    });

    return unsubscribeFocus;
  }, [navigation, isFocused]);

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
      <CameraStack.Screen
        name={CameraScreens.INGREDIENT_DETAIL}
        component={IngredientDetail}
        options={{ title: CameraScreens.INGREDIENT_DETAIL }}
      />
      <CameraStack.Screen
        name={CameraScreens.RECIPE_DETAIL}
        component={RecipeDetail}
        options={{ title: CameraScreens.RECIPE_DETAIL }}
      />
    </CameraStack.Navigator>
  );
};
