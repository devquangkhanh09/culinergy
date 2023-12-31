import { RootStackParamList } from '@/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { AuthScreens, RootScreens } from '..';
import { useAppDispatch } from '@/Hooks';
import { setGuest, setToken } from '@/Store/reducers';
import { AuthStackParamList } from '@/Navigation/AuthNavigation/AuthNavigation';
import { useRegisterMutation } from '@/Services/auth';
import { Colors } from '@/Theme/Variables';

type RegisterScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.REGISTER
>;

const showPasswordIcon = require('../../../assets/authentication/show.png')
const hidePasswordIcon = require('../../../assets/authentication/hidden.png')

export const Register = ({ navigation }: RegisterScreenNavigatorProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isClickedSignUp, setIsClickedSignUp] = useState(false)

  const [register, { data, error, isLoading }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const handleRegister = () => {
    if (password == confirmPassword) {
      register({ name, email, password });
    }
    setIsClickedSignUp(true)
  };

  useEffect(() => {
    if (data) {
      setIsClickedSignUp(false)
      dispatch(setToken(data.accessToken));
      navigation.navigate(RootScreens.MAIN);
    }
  }, [data]);

  const handleContinueAsGuest = () => {
    setIsClickedSignUp(false)
    dispatch(setGuest());
    navigation.navigate(RootScreens.MAIN);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
            <View style={isClickedSignUp && (error || password !== confirmPassword) ? styles.error : { height: 40, marginBottom: 20, marginTop: -15 }}>
              {isClickedSignUp &&
                password !== confirmPassword ?
                <Text style={{ fontWeight: '700' }}>
                  {password !== confirmPassword ? 'Password confirmation doesn\'t match password.' : 'Something went wrong.'}
                </Text>
                : error &&
                <>
                  <Text style={{ fontWeight: '700' }}>
                    Something went wrong.
                  </Text>
                  <Text style={{ fontWeight: '700' }}>
                    Please try again.
                  </Text>
                </>
              }
            </View>
            <TextInput
              style={styles.text}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
            <TextInput
              style={styles.text}
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoCapitalize='none'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginBottom: 20 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginBottom: 30 }}>
              <TextInput
                style={{
                  height: 50,
                  paddingLeft: 25,
                  flexGrow: 1
                }}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ marginHorizontal: 10 }}>
                <Image
                  source={showConfirmPassword ? hidePasswordIcon : showPasswordIcon}
                  style={{ height: 30, width: 30 }}
                />
              </Pressable>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Pressable
                style={[styles.button]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.WHITE}
                  />) : (
                  <Text
                    style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>
                    Sign up
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
              <Text style={{ fontSize: 14 }}>Already have an account? </Text>
              <Text
                style={{ fontSize: 14, fontWeight: '700' }}
                onPress={() => {
                  setIsClickedSignUp(false)
                  navigation.navigate(AuthScreens.LOGIN)
                }}>
                Log in.
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.BUTTON,
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
