import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useAppDispatch } from "@/Hooks";
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { MainScreens, RootScreens } from '..';
import { BigRecipeWidget } from '@/Components/Recipe/BigRecipeWidget';

type FavoritesScreenNavigatorProps = {
  navigation: {
    navigate: (screen: RootScreens | MainScreens) => void;
  };
}

const recipe = [
  {
    img: require('../../../assets/recipe/recipe-3.png'),
    name: 'Pasta alla Norma',
    isLike: true,
  },
  {
    img: require('../../../assets/recipe/recipe-1.png'),
    name: 'Chicken soup Allan Pasta',
    isLike: true,
  },
  {
    img: require('../../../assets/recipe/recipe-2.png'),
    name: 'Tomato Pasta',
    isLike: true,
  }
]

export const Favorites = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {recipe.map(item => (
          <BigRecipeWidget data={item} />
        ))}
      </View>
    </ScrollView>
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

