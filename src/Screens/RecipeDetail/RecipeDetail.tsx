import Badge from '@/Components/Badge/Badge';
import { CameraStackParamList } from '@/Navigation/CameraNavigation/CameraNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CameraScreens } from '..';
import { Recipe, useLazyGetRecipeQuery } from '@/Services/recipes';
import { useToggleFavoriteRecipeMutation } from '@/Services/recipes';
import { useAppDispatch } from '@/Hooks';
import { updateFavorites } from '@/Store/reducers/favorites';

type RecipeDetailScreenNavigationProp = NativeStackScreenProps<
  CameraStackParamList,
  CameraScreens.RECIPE_DETAIL
>;

export default function RecipeDetail ({ route }: RecipeDetailScreenNavigationProp) {
  const { recipeId } = route.params;
  // TODO: show loading indicator
  const [fetchOne, { data, isLoading }] = useLazyGetRecipeQuery();
  const [recipeData, setRecipeData] = useState(data);
  const [toggleFavoriteRecipe] = useToggleFavoriteRecipeMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOne(recipeId);
  }, [route.params.recipeId]);

  useEffect(() => {
    if (data) {
      setRecipeData(data);
    }
  }, [data]);

  const handleToggleFavorite = async () => {
    if (!recipeData || recipeData.isFavorite === undefined) return;

    const response = await toggleFavoriteRecipe(recipeData._id);

    if ('data' in response) {
      const responseData = response.data;
      // the responseData does not populate the ingredients, so we need to partially update the recipeData
      setRecipeData({
        ...recipeData,
        isFavorite: responseData.isFavorite,
        favoriteCount: responseData.favoriteCount,
      });
      dispatch(updateFavorites());
    } else if ('error' in response) {
      console.log(response.error);
    }
  };

  return (
    (recipeData &&
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipeData.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={handleToggleFavorite}>
          <Icon
            name={recipeData.isFavorite ? 'heart' : 'heart-o'}
            size={40}
            color={recipeData.isFavorite ? 'red' : '#000'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeHeader}>{recipeData.name}</Text>
        <View style={styles.content}>
          <View style={styles.flexBetween}>
            <Icon name="clock-o" size={30} color="#000" style={styles.icon} />
            <Text style={styles.text}>{recipeData.timeToCook}</Text>
          </View>
          <View style={styles.flexBetween}>
            <MCIcon
              name="chef-hat"
              size={30}
              color="#000000"
              style={styles.icon}
            />
            <Text style={styles.text}>{recipeData.favoriteCount} cooked</Text>
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Tags</Text>
          <View style={styles.badgeList}>
            {recipeData.tags.map((tag, idx) => (
              <View key={idx} style={styles.badgeItem}>
                <Badge id={idx} name={tag} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Ingredients</Text>
          <View>
            {recipeData.ingredients.map((ingredient) => (
              <View key={ingredient._id}>
                <Text style={styles.textItem}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Instructions</Text>
          <View>
            {recipeData.instructions.map((instruction, idx) => (
              <View key={idx}>
                <Text style={styles.textItem}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: Dimensions.get('window').height * 0.4,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  recipeInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  recipeHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.85,
    margin: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
  },
  contentList: {
    width: Dimensions.get('window').width * 0.85,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  text: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textSubHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  badgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  badgeItem: {
    marginBottom: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  textItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
function toggleFavoriteRecipe(_id: number) {
  throw new Error('Function not implemented.');
}

