import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, ImageBackground, Text, Pressable, Image } from 'react-native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/authentication/background-authentication.png')}
        resizeMode='cover'
        style={{ width: '100%', height: '100%' }}
      >
        <View style={{ paddingHorizontal: 38 }}>
          <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '700' }}>Welcome to</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#57B97D' }}>Culinergy</Text>
          </View>
          <View style={{ height: 40, marginBottom: 20, marginTop: -15 }}></View>
          <TextInput
            style={styles.text}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.text}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.text}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={{ ...styles.text, marginBottom: 30 }}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{ ...styles.button, backgroundColor: '#0E1E22' }}
              onPress={handleRegister}
            >
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>Sign up</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', gap: 15 }}>
            <View style={{ flex: 1, borderWidth: 0.5, height: 1 }} />
            <Text style={{ fontSize: 15, fontWeight: '600' }}>or log in with</Text>
            <View style={{ flex: 1, width: 10, borderWidth: 0.5, height: 1 }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../assets/authentication/icon-google.png')}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80 }}>
            <Text style={{ fontSize: 14 }}>Already have an account? </Text>
            <Text style={{ fontSize: 14, fontWeight: '700' }} onPress={() => navigation.navigate(RootScreens.LOGIN)}>Log in.</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable style={{ ...styles.button, backgroundColor: '#57B97D' }} onPress={handleContinueAsGuest}>
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>Continue as Guest</Text>
            </Pressable>
          </View>
        </View >
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 25,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#57B97D',
    width: 250,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23
  },
});
