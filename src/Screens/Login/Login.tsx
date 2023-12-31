import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Button,
  ImageBackground,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AuthScreens, RootScreens } from '..';
import { useAppDispatch, useAppSelector } from '@/Hooks';
import { setFirstTime, setGuest, setToken } from '@/Store/reducers';
import { AuthStackParamList } from '@/Navigation/AuthNavigation/AuthNavigation';
import { useLoginMutation } from '@/Services/auth';
import { Colors } from '@/Theme/Variables';

type LoginScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.LOGIN
>;

const showPasswordIcon = require('../../../assets/authentication/show.png')
const hidePasswordIcon = require('../../../assets/authentication/hidden.png')

export const Login = ({ navigation }: LoginScreenNavigatorProps) => {
  const user = useAppSelector((state) => state.user);
  const isFirstTime = useAppSelector((state) => state.firstTime.isFirstTime);
  const [showPassword, setShowPassword] = useState(false)
  const [isClickedLogin, setIsClickedLogin] = useState(false)

  const [login, { data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (user.token || user.isGuest) {
      navigation.navigate(RootScreens.MAIN);
    }
  }, [user]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isFirstTime) {
      navigation.navigate(AuthScreens.WELCOME);
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, password });
    setIsClickedLogin(true)
  };

  useEffect(() => {
    if (data) {
      setIsClickedLogin(false)
      dispatch(setToken(data.accessToken));
      navigation.navigate(RootScreens.MAIN);
    }
  }, [data]);

  const handleContinueAsGuest = () => {
    setIsClickedLogin(false)
    dispatch(setGuest());
    navigation.navigate(RootScreens.MAIN);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/authentication/background-authentication.png')}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <View style={{ paddingHorizontal: 38 }}>
          <View
            style={{
              height: 180,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24, fontWeight: '700' }}>Welcome to</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#57B97D' }}>
              Culinergy
            </Text>
          </View>
          <View style={isClickedLogin && error ? styles.error : { height: 40, marginBottom: 20, marginTop: -15 }}>
            {isClickedLogin && error &&
              <>
                <Text style={{ fontWeight: '700' }}>
                  Incorrect email or password.
                </Text>
                <Text style={{ fontWeight: '700' }}>
                  Please try again.
                </Text>
              </>
            }
          </View>
          <TextInput
            style={{
              height: 50,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 25,
              marginBottom: 20,
            }}
            autoCapitalize='none'
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10 }}>
            <TextInput
              style={{
                height: 50,
                paddingLeft: 25,
                flexGrow: 1
              }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={{ marginHorizontal: 10 }}>
              <Image
                source={showPassword ? hidePasswordIcon : showPasswordIcon}
                style={{ height: 30, width: 30 }}
              />
            </Pressable>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginVertical: 8,
              height: 34,
              justifyContent: 'center',
            }}>
            <Text
              style={{ fontSize: 15 }}
              onPress={() => navigation.navigate(AuthScreens.REGISTER)}>
              Forgot pasword?
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{ ...styles.button, backgroundColor: '#0E1E22', }}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.WHITE}
                />) : (
                <Text
                  style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>
                  Log in
                </Text>
              )}
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              alignItems: 'center',
              gap: 15,
            }}>
            <View style={{ flex: 1, borderWidth: 0.5, height: 1 }} />
            <Text style={{ fontSize: 15, fontWeight: '600' }}>
              or log in with
            </Text>
            <View style={{ flex: 1, width: 10, borderWidth: 0.5, height: 1 }} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../assets/authentication/icon-google.png')}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 80,
            }}>
            <Text style={{ fontSize: 14 }}>Don't have an account yet? </Text>
            <Text
              style={{ fontSize: 14, fontWeight: '700' }}
              onPress={() => {
                setIsClickedLogin(false)
                navigation.navigate(AuthScreens.REGISTER)
              }}>
              Create one.
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{ ...styles.button, backgroundColor: '#57B97D' }}
              onPress={handleContinueAsGuest}>
              <Text
                style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>
                Continue as Guest
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#57B97D',
    width: 250,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderLeftColor: 'red',
    height: 40,
    marginBottom: 20,
    marginTop: -15,
    paddingLeft: 20,
    justifyContent: 'center'
  },
});
