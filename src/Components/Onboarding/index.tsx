import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { OnboardingColors } from '@/Theme/Variables';

var maxWidth = Dimensions.get('window').width;
var maxHeight = Dimensions.get('window').height;

interface Props {
  image: any;
  title: string;
  keyword: string;
  subtitle: string;
}

export const Onboarding = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.onBoardingImage} />
      <View style={[styles.textBackground, styles.shadowProp]}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.keyword}>{props.keyword}</Text>
        <Text style={styles.subTitle}> {props.subtitle}</Text>
        {/* <Button style={styles.onboardingButton}>Next</Button> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: maxWidth,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 6px 18px 0px rgba(64, 62, 172, 0.16)',
    textAlign: 'center',
    height: maxHeight,
  },
  onBoardingImage: {
    height: maxHeight / 2,
    width: maxWidth
  },
  textBackground: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 336,
    borderRadius: 8,
    bottom: 250,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 28,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  keyword: {
    fontWeight: 'bold',
    fontSize: 30,
    color: OnboardingColors.KEYWORD,
  },
  subTitle: {
    color: OnboardingColors.SUBTITLE,
    textAlign: 'center',
    padding: 30,
    fontSize: 16,
  },
  onboardingButton: {
    backgroundColor: '#0E1E22',
    width: 250,
    borderRadius: 20
  }
});
