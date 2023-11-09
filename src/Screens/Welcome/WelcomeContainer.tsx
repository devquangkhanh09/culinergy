import React, { useEffect } from "react";
import { Welcome } from "./Welcome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/Store";

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.WELCOME
>;

export const WelcomeContainer = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  const isFirstTime = useAppSelector((state) => state.firstTime.isFirstTime)
  useEffect(() => {
    if (!isFirstTime) {
      onNavigate(RootScreens.MAIN)
    }
  }, [])
  return <Welcome onNavigate={onNavigate} />;
};
