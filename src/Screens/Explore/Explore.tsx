import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAppSelector, useAppDispatch } from "@/Hooks";
import { toggleIngredient } from '@/Store/reducers';
import { MainScreens, RootScreens } from '..';
import SearchInput from '@/Components/Input/SearchInput';
import RemovableChip from '@/Components/Input/RemovableChip';
import SimpleRecipeWidget from '@/Components/Recipe/SimpleRecipeWidget';
import SelectionModal from '@/Components/Modal/SelectionModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@/Theme/Variables';
import { useLazyGetIngredientsQuery } from '@/Services/ingredients';
import { useLazySearchRecipesQuery } from '@/Services/recipes';

type ExploreScreenNavigatorProps = {
  navigation: {
    navigate: (screen: RootScreens | MainScreens) => void;
  };
}

// TODO: improve performance by using pagination
// TODO: fix the bug and warning printed in the console
export const Explore = ({
  navigation,
}: ExploreScreenNavigatorProps) => {
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  // TODO: show loading indicator
  const [fetchIngredients, { data: ingredientsData }] = useLazyGetIngredientsQuery();
  const [fetchRecipes, { data: recipesData }] = useLazySearchRecipesQuery();
  const selectedIngredients = useAppSelector(state => state.explore.selectedIngredients);
  const ingredients = useAppSelector(state => state.explore.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSelectionComplete = () => {
    setIsIngredientModalVisible(false);
    if (selectedIngredients.length === 0) return;

    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: searchText,
    });
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (text.length < 3) return;

    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: text,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput
          placeholder='Search (enter at least 3 characters)'
          prefixIcon={<Icon name='search' size={20} color='#000' />}
          onSearch={handleSearchChange}
        />

        <SelectionModal
          isVisible={isIngredientModalVisible}
          title='Select ingredients'
          options={ingredientsData? ingredientsData : []}
          storeKey='explore'
          reducer={toggleIngredient}
          onSelectionComplete={handleSelectionComplete}
        />

        <Text style={styles.subheader}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          <Pressable onPress={() => setIsIngredientModalVisible(true)}>
            <View style={styles.ingredientsAddBtn}>
              <Icon name='add' size={20} color='#fff' />
            </View>
          </Pressable>
          {selectedIngredients.map((ingredient, idx) => (
            <RemovableChip
              key={idx}
              item={ingredient}
              onRemove={(item) => dispatch(toggleIngredient(item))}
            />
          ))}
        </View>

        <Text style={styles.subheader}>Recipes</Text>
        <View style={styles.recipesContainer}>
          {recipesData && recipesData.map((recipe) => (
            <SimpleRecipeWidget
              key={recipe._id}
              data={recipe}
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

