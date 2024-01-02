import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Switch,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@/Hooks';
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { AuthScreens, MainScreens, RootScreens, SettingScreens } from '..';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfileMutation } from '@/Services';
import { updateUserProfile } from '@/Store/reducers';

export const Settings = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.profile);
  const [updateProfile] = useUpdateProfileMutation();

  const handleLogOut = () => {
    dispatch(setToken(''));
    navigation.navigate(AuthScreens.LOGIN);
  };

  const handleReset = () => {
    dispatch(unsetFirstTime());
    dispatch(setToken(''));
    navigation.navigate(AuthScreens.WELCOME);
  };

  const handleToggleSwitch = () => {
    dispatch(updateUserProfile({
      isVegan: !userProfile.isVegan,
    }));
  };

  useEffect(() => {
    if (userProfile._id) {
      updateProfile({
        isVegan: userProfile.isVegan,
      });
    }
  }, [userProfile]);

  // TODO: remove button to reset
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/settings/avatar.png')}
        style={{ height: 100, width: 100 }}
      />
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>
          {userProfile.name}
        </Text>
      </View>
      <Text style={{ fontSize: 15 }}>
        {userProfile.email}
      </Text>
      <View style={{ width: '100%', marginTop: 44, gap: 15 }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate(SettingScreens.CHANGE_PASSWORD)}>
          <Text style={{ fontSize: 15 }}>Change password</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() =>
            navigation.navigate(SettingScreens.ALLERGENIC_INGREDIENS)
          }>
          <Text style={{ fontSize: 15 }}>List of allergenic ingredients</Text>
        </Pressable>
        <View style={{ ...styles.button, flexDirection: 'row' }}>
          <Text style={{ fontSize: 15 }}>Are you a vegetarian?</Text>
          <Switch
            value={userProfile.isVegan}
            onValueChange={handleToggleSwitch}
            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          />
        </View>
      </View>
      <Pressable
        style={{
          ...styles.button,
          width: 250,
          backgroundColor: '#0E1E22',
          marginVertical: 30,
        }}
        onPress={handleLogOut}>
        <Text style={{ fontSize: 15, color: '#ffffff', fontWeight: '600' }}>
          Log out
        </Text>
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
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  buttonPressed: {
    backgroundColor: 'transparent',
  },
});
