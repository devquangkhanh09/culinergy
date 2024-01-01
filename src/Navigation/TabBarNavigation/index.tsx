import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeContainer } from '@/Screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainScreens, TabBarScreens } from '@/Screens';
import { Explore } from '@/Screens/Explore';
import { Favorites } from '@/Screens/Favorites';
import { Colors } from '@/Theme/Variables';
import { View } from 'react-native';
import { CameraStackScreen } from '../CameraNavigation/CameraNavigation';
import { SettingStackScreen } from '../SettingNavigation/SettingNavigation';

export type TabBarNavigatorProps = {
  [TabBarScreens.HOME]: undefined;
  [TabBarScreens.SETTINGS]: undefined;
  [TabBarScreens.CAMERA]: undefined;
  [TabBarScreens.EXPLORE]: undefined;
  [TabBarScreens.FAVORITES]: undefined;
};

const Tab = createBottomTabNavigator<TabBarNavigatorProps>();

// @refresh reset
export const TabBarNavigator = () => {
  return (
    <Tab.Navigator
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
        name={TabBarScreens.HOME}
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
        name={TabBarScreens.EXPLORE}
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
        name={TabBarScreens.CAMERA}
        component={CameraStackScreen}
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
        name={TabBarScreens.FAVORITES}
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
        name={TabBarScreens.SETTINGS}
        component={SettingStackScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelPosition: 'below-icon',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
