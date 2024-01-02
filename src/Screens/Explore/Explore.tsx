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
import { Recipe, useLazySearchRecipesQuery } from '@/Services/recipes';
import CustomButton from '@/Components/Button/Button';
import { LoadingIndicator } from '@/Components/Indicator/LoadingIndicator';

type ExploreScreenNavigatorProps = {
  navigation: {
    navigate: (screen: RootScreens | MainScreens) => void;
  };
}

export const Explore = ({
  navigation,
}: ExploreScreenNavigatorProps) => {
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [fetchIngredients, { data: ingredientsData, isFetching: isFetching1 }] = useLazyGetIngredientsQuery();
  const [fetchRecipes, { data: recipesData, isFetching: isFetching2 }] = useLazySearchRecipesQuery();
  const selectedIngredients = useAppSelector(state => state.explore.selectedIngredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (isIngredientModalVisible) return;

    setRecipes([]);
    setPage(1);
    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: searchText,
      page: 1,
    });
  }, [selectedIngredients]);

  useEffect(() => {
    // append new recipes to the existing list
    if (recipesData && recipesData.length > 0 && !isFetching2) {
      setRecipes([...recipes, ...recipesData]);
    }
    if (isFetching2) {
      setIsLoadingMore(true);
    } else {
      setIsLoadingMore(false);
    }
  }, [recipesData, isFetching2]);

  // TODO: handle end of list (no more recipes)
  const handleLoadMore = () => {
    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: searchText,
      page: page + 1,
    });
    setIsLoadingMore(true);
    setPage(page + 1);
  };

  const handleSelectionComplete = () => {
    setIsIngredientModalVisible(false);
    setRecipes([]);
    setPage(1);
    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: searchText,
    });
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setRecipes([]);
    setPage(1);
    fetchRecipes({
      ingredients: selectedIngredients.map((ingredient) => ingredient._id),
      name: text,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchInput
          placeholder='Search'
          prefixIcon={<Icon name='search' size={20} color='#000' />}
          onSearch={handleSearchChange}
        />

        <SelectionModal
          isVisible={isIngredientModalVisible}
          title='Select ingredients'
          options={ingredientsData? ingredientsData : []}
          storeCode='ingredients-explore'
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

        {(isFetching1 || (isFetching2 && !isLoadingMore)) ? <LoadingIndicator /> : (
          <View>
            <View style={styles.recipesContainer}>
              {recipes.map((recipe) => (
                <SimpleRecipeWidget
                  key={recipe._id}
                  data={recipe}
                />
              ))}
            </View>

            {recipes.length > 0 && (
              <CustomButton
                title='Load more'
                onPress={handleLoadMore}
                style={{ marginTop: 20 }}
                isLoading={isLoadingMore}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 50,
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

