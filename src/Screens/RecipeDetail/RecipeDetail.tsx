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
import { CameraScreens, MainScreens } from '..';
import { Recipe, useLazyGetRecipeQuery } from '@/Services/recipes';
import { useToggleFavoriteRecipeMutation } from '@/Services/recipes';
import { useAppDispatch, useAppSelector } from '@/Hooks';
import { updateFavorites } from '@/Store/reducers/favorites';
import { LoadingIndicator } from '@/Components/Indicator/LoadingIndicator';
import { MainNavigatorProps } from '@/Navigation/Main';
import { activateUserOnlyModal } from '@/Store/reducers/modal';
import { setRecentlyViewedRecipe } from '@/Store/reducers';

type RecipeDetailScreenNavigationProp = NativeStackScreenProps<
  MainNavigatorProps,
  MainScreens.RECIPE_DETAIL
>;

export default function RecipeDetail({
  route,
}: RecipeDetailScreenNavigationProp) {
  const { recipeId } = route.params;
  const userProfile = useAppSelector((state) => state.user.profile);
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
      dispatch(setRecentlyViewedRecipe(data));
    }
  }, [data]);

  const handleToggleFavorite = async () => {
    if (!recipeData || recipeData.isFavorite === undefined) {
      dispatch(activateUserOnlyModal());
      return;
    }

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

  return isLoading || !recipeData ? (
    <LoadingIndicator />
  ) : (
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
        <View style={styles.notification}>

          {userProfile.isVegan && (
            (recipeData.tags.includes('Vegan') || recipeData.tags.includes('Vegetarian')) ? (
              <View style={styles.flexStart}>
                <Icon name="check" size={30} color='green' />
                <Text style={styles.notiText}>This recipe is vegan</Text>
              </View>
            ) : (
              <View style={styles.flexStart}>
                <Icon name="close" size={30} color='red' />
                <Text style={styles.notiText}>This recipe is not vegan</Text>
              </View>
            )
          )}

          {userProfile.allergies.length > 0 && (
            (recipeData.ingredients.some((ingredient) => userProfile.allergies.find((allergy) => (allergy._id === ingredient._id)))) ? (
              <View style={styles.flexStart}>
                <Icon name="close" size={30} color='red' />
                <Text style={styles.notiText}>This recipe contains your allergies</Text>
              </View>
            ) : (
              <View style={styles.flexStart}>
                <Icon name="check" size={30} color='green' />
                <Text style={styles.notiText}>This recipe does not contain your allergies</Text>
              </View>
            )
          )}

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
            {recipeData.ingredients.map((ingredient, idx) => (
              <View key={idx} style={styles.ingredientRow}>
                <Text style={styles.textItem}>{ingredient.name}</Text>
                {userProfile.allergies.find((allergy) => (allergy._id === ingredient._id)) && (
                  <Icon name="exclamation-circle" size={20} color="red" />
                )}
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
    width: Dimensions.get('window').width * 0.85,
    textAlign: 'center',
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

  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
  },
  notification: {
    width: Dimensions.get('window').width * 0.85,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
  },
  notiText: {
    fontSize: 16,
    marginVertical: 5,
    width: Dimensions.get('window').width * 0.8,
  },
  flexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
function toggleFavoriteRecipe(_id: number) {
  throw new Error('Function not implemented.');
}
