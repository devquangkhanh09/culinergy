import React, { useEffect, useState } from "react";
// import { i18n, LocalizationKey } from "@/Localization";
import { View, StyleSheet } from "react-native";
import { RootScreens } from "..";
import { OnboardFlow } from "react-native-onboard";
import { Onboarding } from "@/Components/Onboarding";
import { OnboardingFooter } from "@/Components/Onboarding/OnboardingFooter";

const onboardingData = [
  {
    image: require('../../../assets/onboarding/onboarding-1.png'),
    title: 'Understand Your',
    keyword: 'Ingredients',
    subtitle: 'Discover the power of automatic AI-driven ingredient recognition and access comprehensive nutritional information.',
  },
  {
    image: require('../../../assets/onboarding/onboarding-2.jpeg'),
    title: 'Discover Interesting',
    keyword: 'Recipes',
    subtitle: 'Explore the world of culinary delights together! Suggest delicious dishes from ingredients you have on hand.',
  },
  {
    image: require('../../../assets/onboarding/onboarding-3.jpeg'),
    title: 'Organize Your',
    keyword: 'Favorites',
    subtitle: 'Save your most-loved recipes to your favorites list for easy access. Cooking has never been this convenient!',
  },
];

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [home, setHome] = useState(false)
  useEffect(() => {
    if (home) {
      props.onNavigate(RootScreens.MAIN)
      console.log('test')
    }
    console.log('home')
  }, [home])

  return (
    <View style={styles.container}>
      <OnboardFlow
        pages={onboardingData.map(item => ({ imageComponent: <Onboarding {...item} /> }))}
        onDone={() => props.onNavigate(RootScreens.MAIN)}
        FooterComponent={(footerProps) => <OnboardingFooter onNavigate={() => setHome(true)} {...footerProps} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
