import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RootScreens } from '..';
import { OnboardingPage } from '@/Components/OnboardingPage/OnboadingPage';
import { OnboardFlow } from 'react-native-onboard';

interface WelcomeProps {
  onNavigate: (string: RootScreens) => void;
}

export const Welcome = (props: WelcomeProps) => {
  const onboardingData = [
    {
      image: require('../../../assets/images/onboarding-step-1.png'),
      title: 'Understand Your',
      keyword: 'Ingredients',
      subtitle:
        'Discover the power of automatic AI-driven ingredient recognition and access comprehensive nutritional information.',
    },
    {
      image: require('../../../assets/images/onboarding-step-2.png'),
      title: 'Discover Interesting',
      keyword: 'Recipes',
      subtitle:
        'Explore the world of culinary delights together! Suggest delicious dishes from ingredients you have on hand.',
    },
    {
      image: require('../../../assets/images/onboarding-step-3.png'),
      title: 'Organize Your',
      keyword: 'Favorites',
      subtitle:
        'Save your most-loved recipes to your favorites list for easy access. Cooking has never been this convenient!',
    },
  ];
  return (
    <View>
      <OnboardFlow
        onDone={() => props.onNavigate(RootScreens.MAIN)}
        pages={[
          {
            imageComponent: <OnboardingPage {...onboardingData[0]} />,
          },
          {
            imageComponent: <OnboardingPage {...onboardingData[1]} />,
          },
          {
            imageComponent: <OnboardingPage {...onboardingData[2]} />,
          },
        ]}
      />
    </View>
  );
};
