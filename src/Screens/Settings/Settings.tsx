import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable, Switch } from 'react-native';
import { useAppDispatch } from '@/Hooks';
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { AuthScreens, MainScreens, RootScreens, SettingsScreens } from '..';

// NOTE: The following code does not work (cannot navigate to RootScreens.LOGIN), but it is the correct way to type the navigation prop
// type SettingsScreenNavigatorProps = BottomTabScreenProps<
//   MainNavigatorProps,
//   MainScreens.SETTINGS
// >;
type SettingsScreenNavigatorProps = {
  navigation: {
    navigate: (screen: AuthScreens | RootScreens | SettingsScreens) => void;
  };
};

export const Settings = ({ navigation }: SettingsScreenNavigatorProps) => {
  const dispatch = useAppDispatch();
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false)

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
      <Image
        source={require('../../../assets/settings/avatar.png')}
        style={{ height: 100, width: 100 }}
      />
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>
          Nobody knows my name
        </Text>
      </View>
      <Text style={{ fontSize: 15 }}>example-culinergy@hcmut.edu.vn</Text>
      <View style={{ width: '100%', marginTop: 44, gap: 15 }}>
        <Pressable style={styles.button}>
          <Text
            style={{ fontSize: 15 }}
            // onPress={() => navigation.navigate(SettingsScreens.CHANGE_PASSWORD)}
          >
            Change password
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={{ fontSize: 15 }}>List of allergenic ingredients</Text>
        </Pressable>
        <View style={{ ...styles.button, flexDirection: 'row' }}>
          <Text style={{ fontSize: 15 }}>Are you a vegetarian?</Text>
          <Switch value={isVegetarian} onValueChange={() => setIsVegetarian(!isVegetarian)} style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }} />
        </View>
      </View>
      <Pressable style={{ ...styles.button, width: 250, backgroundColor: '#0E1E22', marginVertical: 30 }} onPress={handleLogOut}>
        <Text style={{ fontSize: 15, color: '#ffffff', fontWeight: '600' }}>Log out</Text>
      </Pressable>
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
  button: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
  },
});
