import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { RecommendCard } from './RecommendCard/RecommendCard';
import CustomButton from '@/Components/Button/Button';
import { MainScreens } from '..';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/Hooks';
import axios from 'axios';
import { useLazyGetRecipeQuery } from '@/Services/recipes';

export default function Recommend() {
  const ingredientList = useAppSelector((state) => state.ingredientList);
  const [recipeList, setRecipeList] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [getRecipeByID] = useLazyGetRecipeQuery();

  useEffect(() => {
    const preProcessingList = async (recipeIDs: any) => {
      const newArray = [];

      for (const id of recipeIDs.food_ids) {
        const recipeObject = await getRecipeByID(id);
        newArray.push(recipeObject);
      }

      return newArray;
    };
    const fetchRecommendDishes = async () => {
      try {
        const response = await axios.post(
          'https://culinergy-ai.hungnhb.dev/recommend',
          {
            ingredient_ids: ingredientList.ingredientListIDs,
          }
        );
        const recipeListData = await preProcessingList(response.data);
        setRecipeList(recipeListData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Scanner Error:', error);
      }
    };
    fetchRecommendDishes();
  }, [ingredientList.ingredientListIDs]);

  const navigator = useNavigation<any>();

  const recommendData =
    recipeList &&
    recipeList.map((recipe: any) => {
      return {
        id: recipe.data._id,
        title: recipe.data.name,
        subTitle: recipe.data.description,
        badge: recipe.data.ingredients,
        imageUrl: recipe.data.imageUrl,
        time: recipe.data.timeToCook,
      };
    });

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Great! Here are the recommended recipes.
      </Text>
      <Text style={styles.textSubHeader}>
        Pick one and become a master chef!
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={recommendData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecommendCard data={item} />}
        />
      )}
      <CustomButton
        title="Back to Home"
        style={styles.customButton}
        onPress={() => navigator.navigate(MainScreens.TAB_BAR)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  textSubHeader: {
    fontSize: 16,
    marginVertical: 20,
  },
  customButton: {
    marginVertical: 25,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 25,
  },
});
