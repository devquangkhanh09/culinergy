import React from 'react';
import { MainScreens } from '@/Screens';
import { Colors } from '@/Theme/Variables';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBarNavigator } from '../TabBarNavigation';
import IngredientDetail from '@/Screens/IngredientDetail/IngredientDetail';
import RecipeDetail from '@/Screens/RecipeDetail/RecipeDetail';
import CustomHeaderBackButton from '@/Components/HeaderBackButton/HeaderBackButton';
import { useAppSelector, useAppDispatch } from '@/Hooks';
import GeneralModal from '@/Components/Modal/GeneralModal';
import { Text } from 'react-native';
import { closeModal } from '@/Store/reducers/modal';

export type MainNavigatorProps = {
  [MainScreens.TAB_BAR]: undefined;
  [MainScreens.INGREDIENT_DETAIL]: undefined;
  [MainScreens.RECIPE_DETAIL]: {
    recipeId: number;
  };
};

const MainStack = createNativeStackNavigator<MainNavigatorProps>();

export const MainNavigator = () => {
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <>
      <MainStack.Navigator>
        <MainStack.Screen
          name={MainScreens.TAB_BAR}
          component={TabBarNavigator}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={MainScreens.INGREDIENT_DETAIL}
          component={IngredientDetail}
          options={{
            title: MainScreens.INGREDIENT_DETAIL,
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
          }}
        />
        <MainStack.Screen
          name={MainScreens.RECIPE_DETAIL}
          getComponent={() => require('@/Screens/RecipeDetail/RecipeDetail').default}
          options={{
            title: MainScreens.RECIPE_DETAIL,
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
          }}
        />
      </MainStack.Navigator>
      <GeneralModal
        isVisible={modal.isOpen}
        title={modal.title}
        onOk={() => dispatch(closeModal())}
      >
        <Text style={{ textAlign: 'center' }}>{modal.content}</Text>
      </GeneralModal>
    </>
  );
};
