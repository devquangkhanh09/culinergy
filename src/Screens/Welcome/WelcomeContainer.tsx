import React, { useEffect } from "react";
import { Welcome } from "./Welcome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useAppSelector } from "@/Hooks";

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.WELCOME
>;

export const WelcomeContainer = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const isFirstTime = useAppSelector((state) => state.firstTime.isFirstTime)
  useEffect(() => {
    if (!isFirstTime) {
      navigation.navigate(RootScreens.LOGIN)
    }
  }, [isFirstTime])

  return <Welcome navigation={navigation} />;
};
