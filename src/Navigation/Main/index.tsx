import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeContainer } from '@/Screens/Home';
import { Settings } from '@/Screens/Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainScreens } from '@/Screens';
import Camera from '@/Screens/Camera/Camera';
import { Explore } from '@/Screens/Explore';
import { Favorites } from '@/Screens/Favorites';
import { Colors } from '@/Theme/Variables';
import { View } from 'react-native';

export type MainNavigatorProps = {
  [MainScreens.HOME]: undefined;
  [MainScreens.SETTINGS]: undefined;
  [MainScreens.CAMERA]: undefined;
  [MainScreens.EXPLORE]: undefined;
  [MainScreens.FAVORITES]: undefined;
};

const Tab = createBottomTabNavigator<MainNavigatorProps>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      id="main"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY_DARK,
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: Colors.PRIMARY_DARK,
      }}>
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />

      <Tab.Screen
        name={MainScreens.EXPLORE}
        component={Explore}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />

      <Tab.Screen
        name={MainScreens.CAMERA}
        component={Camera}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{ position: 'absolute', top: -30, alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 5,
                  borderColor: Colors.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={focused ? 'scan' : 'scan-outline'}
                  color={color}
                  size={size}
                />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tab.Screen
        name={MainScreens.FAVORITES}
        component={Favorites}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />

      <Tab.Screen
        name={MainScreens.SETTINGS}
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      />
    </Tab.Navigator>
  );
};
