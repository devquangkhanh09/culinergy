import React, { useEffect } from 'react';
import { Welcome } from './Welcome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthScreens } from '..';
import { useAppSelector } from '@/Hooks';
import { AuthStackParamList } from '@/Navigation/AuthNavigation/AuthNavigation';

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.WELCOME
>;

export const WelcomeContainer = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const isFirstTime = useAppSelector((state) => state.firstTime.isFirstTime);

  useEffect(() => {
    if (!isFirstTime) {
      navigation.navigate(AuthScreens.LOGIN);
    }
  }, [isFirstTime, navigation]);

  return <Welcome navigation={navigation} />;
};
