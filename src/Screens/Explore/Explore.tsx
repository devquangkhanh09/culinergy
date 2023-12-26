import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useAppDispatch } from "@/Hooks";
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { MainScreens, RootScreens } from '..';
import SearchInput from '@/Components/Input/SearchInput';
import RemovableChip from '@/Components/Input/RemovableChip';
import SimpleRecipeWidget from '@/Components/Recipe/SimpleRecipeWidget';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@/Theme/Variables';

type ExploreScreenNavigatorProps = {
  navigation: {
    navigate: (screen: RootScreens | MainScreens) => void;
  };
}

const sampleIngredients = [
  'Chicken',
  'Beef',
  'Pork',
  'Fish',
  'Shrimp',
  'Egg',
  'Milk',
]

const sampleRecipes = [
  {
    id: 1,
    name: 'Chicken Adobo with Rice',
    img: require('../../../assets/recipe/recipe-1.png'),
  },
  {
    id: 2,
    name: 'Chicken',
    img: require('../../../assets/recipe/recipe-2.png'),
  },
  {
    id: 3,
    name: 'Chicken Soup',
    img: require('../../../assets/recipe/recipe-2.png'),
  },
]

export const Explore = ({
  navigation,
}: ExploreScreenNavigatorProps) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput
          placeholder='Search'
          prefixIcon={<Icon name='search' size={20} color='#000' />}
          onSearch={(text) => console.log(text)}
        />

        <Text style={styles.subheader}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredientsAddBtn}>
            <Icon name='add' size={20} color='#fff' />
          </View>
          {sampleIngredients.map((ingredient, idx) => (
            <RemovableChip
              key={idx}
              text={ingredient}
              onRemove={(value) => console.log(value)}
            />
          ))}
        </View>

        <Text style={styles.subheader}>Recipes</Text>
        <View style={styles.recipesContainer}>
          {sampleRecipes.map((recipe) => (
            <SimpleRecipeWidget
              key={recipe.id}
              name={recipe.name}
              img={recipe.img}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  ingredientsAddBtn: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  recipesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
  },
});

