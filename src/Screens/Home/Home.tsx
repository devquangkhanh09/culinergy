import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { useAppSelector, useAppDispatch } from "@/Hooks";
import { BigRecipeWidget } from "@/Components/Recipe/BigRecipeWidget";
import { Recipe, useLazyGetRecipeQuery } from "@/Services/recipes";
import { setRecentlyViewedRecipe } from "@/Store/reducers";

export interface IHomeProps {
  data: {
    profile: User | undefined;
    recipes: Recipe[] | undefined;
  };
}

export const Home = (props: IHomeProps) => {
  const { data } = props;

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const [fetchRecipe, { data: recipeData, isLoading }] = useLazyGetRecipeQuery();
  const favoritesUpdatedIndex = useAppSelector((state) => state.favorites.favoritesUpdatedIndex);
  
  useEffect(() => {
    if (user.recentlyViewedRecipe._id !== -1) {
      fetchRecipe(user.recentlyViewedRecipe._id);
    }
  }, [favoritesUpdatedIndex]);

  useEffect(() => {
    if (recipeData) {
      dispatch(setRecentlyViewedRecipe(recipeData));
    }
  }, [recipeData]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <SafeAreaView>
          <View style={{ marginTop: 35, marginBottom: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>{user.isGuest ? 'Welcome to' : `Welcome, ${data.profile?.name}!`}</Text>
            {user.isGuest && <Text style={{ fontSize: 20, fontWeight: '700', color: '#57B97D' }}>Culinergy</Text>}
          </View>
          <Text style={{ fontWeight: '700', marginBottom: 15 }}>Recipe of the day</Text>
          {data.recipes && <BigRecipeWidget data={data.recipes[0]} />}
          <Text style={{ fontWeight: '700', marginBottom: 15, marginTop: 15 }}>Recently viewed</Text>
          {user.recentlyViewedRecipe._id !== -1 && <BigRecipeWidget data={user.recentlyViewedRecipe} />}
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f7",
    alignItems: "center",
    justifyContent: "flex-start",
    height: '100%',
  },
});
