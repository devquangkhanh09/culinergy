import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useAppSelector } from "@/Hooks";
import { BigRecipeWidget } from "@/Components/Recipe/BigRecipeWidget";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

const recipeData = {
  img: require('../../../assets/recipe/recipe-1.png'),
  name: 'Chicken soup Allan Pasta',
  isLike: false,
}

const ingredientData = {
  img: require('../../../assets/recipe/recipe-2.png'),
  name: 'Tomato Pasta',
  isLike: true,
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;

  const user = useAppSelector((state) => state.user);

  return (
    <View style={{ ...styles.container, justifyContent: isLoading ? 'center' : 'flex-start' }}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <SafeAreaView>
          <View style={{ marginTop: 35, marginBottom: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>{user.isGuest ? 'Welcome to' : `Welcome, ${data?.username}!`}</Text>
            {user.isGuest && <Text style={{ fontSize: 20, fontWeight: '700', color: '#57B97D' }}>Culinergy</Text>}
          </View>
          <Text style={{ fontWeight: '700', marginBottom: 15 }}>Recipe of the day</Text>
          <BigRecipeWidget data={recipeData} />
          <Text style={{ fontWeight: '700', marginVertical: 15 }}>Ingredient of the day</Text>
          <BigRecipeWidget data={ingredientData} />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f7",
    alignItems: "center",
    justifyContent: "center",
  },
});
