import React, { useEffect, useState } from 'react';
// import { i18n, LocalizationKey } from "@/Localization";
import { View, StyleSheet } from 'react-native';
import { AuthScreens, RootScreens } from '..';
import { OnboardFlow } from 'react-native-onboard';
import { Onboarding } from '@/Components/Onboarding';
import { OnboardingFooter } from '@/Components/Onboarding/OnboardingFooter';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/Navigation/AuthNavigation/AuthNavigation';
import { useAppDispatch } from '@/Hooks';
import { setFirstTime } from '@/Store/reducers';

const onboardingData = [
  {
    image: require('../../../assets/onboarding/onboarding-1.png'),
    title: 'Understand Your',
    keyword: 'Ingredients',
    subtitle:
      'Discover the power of automatic AI-driven ingredient recognition and access comprehensive nutritional information.',
  },
  {
    image: require('../../../assets/onboarding/onboarding-2.jpeg'),
    title: 'Discover Interesting',
    keyword: 'Recipes',
    subtitle:
      'Explore the world of culinary delights together! Suggest delicious dishes from ingredients you have on hand.',
  },
  {
    image: require('../../../assets/onboarding/onboarding-3.jpeg'),
    title: 'Organize Your',
    keyword: 'Favorites',
    subtitle:
      'Save your most-loved recipes to your favorites list for easy access. Cooking has never been this convenient!',
  },
];

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.WELCOME
>;

export const Welcome = ({ navigation }: WelcomeScreenNavigatorProps) => {
  const dispatch = useAppDispatch();

  const handleOnDone = () => {
    dispatch(setFirstTime());
    navigation.navigate(AuthScreens.LOGIN);
  };

  return (
    <View style={styles.container}>
      <OnboardFlow
        pages={onboardingData.map((item) => ({
          imageComponent: <Onboarding {...item} />,
        }))}
        onDone={handleOnDone}
        FooterComponent={(footerProps) => (
          <OnboardingFooter onDone={handleOnDone} {...footerProps} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
