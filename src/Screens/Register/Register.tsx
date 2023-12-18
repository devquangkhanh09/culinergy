import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { RootScreens } from '..';
import { useAppDispatch } from "@/Hooks";
import { setGuest, setToken } from '@/Store/reducers';

type RegisterScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.REGISTER
>;

export const Register = ({
  navigation,
}: RegisterScreenNavigatorProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch()

  const handleRegister = () => {
    // TODO: perform register logic here
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Login" onPress={() => navigation.navigate(RootScreens.LOGIN)} />
      <Button title="Register" onPress={handleRegister} />
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
