import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeContainer } from '@/Screens/Home';
import { Settings } from '@/Screens/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MainScreens } from '@/Screens';
import Camera from '@/Screens/Camera/Camera';

export type MainNavigatorProps = {
  [MainScreens.HOME]: undefined;
  [MainScreens.SETTINGS]: undefined;
  [MainScreens.CAMERA]: undefined;
};

const Tab = createBottomTabNavigator<MainNavigatorProps>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator id="main" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />

      <Tab.Screen
        name={MainScreens.CAMERA}
        component={Camera}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera-alt" color={color} size={size} />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />

      <Tab.Screen
        name={MainScreens.SETTINGS}
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
    </Tab.Navigator>
  );
};
