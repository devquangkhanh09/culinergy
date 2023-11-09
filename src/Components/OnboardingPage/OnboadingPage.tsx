import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from './styles';

interface OnboardingProps {
  image: any;
  title: string;
  keyword: string;
  subtitle: string;
}

export const OnboardingPage = (props: OnboardingProps) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.onBoardingImage} />
      <Text style={styles.title}>
        {props.title}
        <Text style={styles.titleSpan}>{' ' + props.keyword}</Text>
      </Text>
      <Text style={styles.subTitle}> {props.subtitle}</Text>
    </View>
  );
};
