import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { MainScreens, RootScreens, TabBarScreens } from '..';
import { BigRecipeWidget } from '@/Components/Recipe/BigRecipeWidget';
import { useLazyGetFavoriteRecipesQuery } from '@/Services/recipes';
import { useAppSelector } from '@/Hooks';

type FavoritesScreenNavigatorProps = {
  navigation: {
    navigate: (screen: TabBarScreens | MainScreens) => void;
  };
}

export const Favorites = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  // TODO: show loading indicator
  const [fetch, { data, isLoading }] = useLazyGetFavoriteRecipesQuery();
  const favoritesUpdatedIndex = useAppSelector((state) => state.favorites.favoritesUpdatedIndex);

  useEffect(() => {
    fetch();
  }, [favoritesUpdatedIndex]);

  return (
    (data && data.length > 0 &&
      <ScrollView>
        <View style={styles.container}>
          {data.map((recipe, idx) => (
            <BigRecipeWidget key={idx} data={recipe} />
          ))}
        </View>
      </ScrollView>
    ) || (data && data.length === 0 &&
      <View style={styles.container}>
        <Text style={styles.header}>No favorite recipes yet!</Text>
        <Button
          title="Go to Explore"
          onPress={() => navigation.navigate(TabBarScreens.EXPLORE)}
        />
      </View>
    ) || <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

