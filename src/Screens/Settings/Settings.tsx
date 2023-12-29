import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch } from '@/Hooks';
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { AuthScreens, MainScreens, RootScreens } from '..';

// NOTE: The following code does not work (cannot navigate to RootScreens.LOGIN), but it is the correct way to type the navigation prop
// type SettingsScreenNavigatorProps = BottomTabScreenProps<
//   MainNavigatorProps,
//   MainScreens.SETTINGS
// >;
type SettingsScreenNavigatorProps = {
  navigation: {
    navigate: (screen: AuthScreens | RootScreens) => void;
  };
};

export const Settings = ({ navigation }: SettingsScreenNavigatorProps) => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    // TODO: perform logout logic here
    dispatch(setToken(''));
    navigation.navigate(AuthScreens.LOGIN);
  };

  const handleReset = () => {
    dispatch(unsetFirstTime());
    dispatch(setToken(''));
    navigation.navigate(AuthScreens.WELCOME);
  };

  // TODO: remove button to reset
  return (
    <View style={styles.container}>
      <Button title="Log out" onPress={handleLogOut} />
      <Button title="Reset (development only)" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
