import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RootScreens } from '..';
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { setFirstTime, setGuest, setToken } from '@/Store/reducers';

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;

export const Login = ({
  navigation,
}: LoginScreenNavigatorProps) => {
  const user = useAppSelector(state => state.user);
  useEffect(() => {
    if (user.token || user.isGuest) {
      navigation.navigate(RootScreens.MAIN);
    }
  }, [user]);

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setFirstTime());
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: perform login logic here
    dispatch(setToken('token'));
    navigation.navigate(RootScreens.MAIN);
  };

  const handleContinueAsGuest = () => {
    dispatch(setGuest());
    navigation.navigate(RootScreens.MAIN);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={() => navigation.navigate(RootScreens.REGISTER)} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Continue as Guest" onPress={handleContinueAsGuest} />
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
