import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, SafeAreaView, Pressable, Image, StyleSheet } from 'react-native';
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

  const [email, setEmail] = useState('');
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
            style={{ height: 50, borderWidth: 1, borderRadius: 10, paddingLeft: 25, marginBottom: 20 }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{ height: 50, borderWidth: 1, borderRadius: 10, paddingLeft: 25 }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={{ alignItems: 'flex-end', marginVertical: 8, height: 34, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15 }} onPress={() => navigation.navigate(RootScreens.REGISTER)}>
              Forgot pasword?
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{ ...styles.button, backgroundColor: '#0E1E22' }}
              onPress={handleLogin}
            >
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>Log in</Text>
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
            <Text style={{ fontSize: 14 }}>Don't have an account yet? </Text>
            <Text style={{ fontSize: 14, fontWeight: '700' }} onPress={() => navigation.navigate(RootScreens.REGISTER)}>Create one.</Text>
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
  button: {
    backgroundColor: '#57B97D',
    width: 250,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23
  },
});