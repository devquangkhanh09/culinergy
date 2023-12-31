import { Recipe } from "@/Services/recipes";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToggleFavoriteRecipeMutation } from "@/Services/recipes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainScreens, RootScreens } from "@/Screens";
import { useAppDispatch } from "@/Hooks";
import { updateFavorites } from "@/Store/reducers/favorites";
import { activateUserOnlyModal } from "@/Store/reducers/modal";

var maxWidth = Dimensions.get('window').width;

export const BigRecipeWidget = ({ data }: { data: Recipe }) => {
  const [recipeData, setRecipeData] = useState(data);
  const [toggleFavoriteRecipe] = useToggleFavoriteRecipeMutation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setRecipeData(data);
  }, [data]);

  const handleToggleFavorite = async () => {
    if (recipeData.isFavorite === undefined) {
      dispatch(activateUserOnlyModal());
      return;
    }

    const response = await toggleFavoriteRecipe(recipeData._id);

    if ('data' in response) {
      const responseData = response.data;
      setRecipeData(responseData);
      dispatch(updateFavorites());
    } else if ('error' in response) {
      console.log(response.error);
    }
  };

  const navigateToRecipeDetail = () => {
    navigation.navigate(RootScreens.MAIN, {
      screen: MainScreens.RECIPE_DETAIL,
      params: { recipeId: recipeData._id },
    });
  };

  return (
    <Pressable onPress={navigateToRecipeDetail}>
      <View style={styles.container}>
        <Image source={{ uri: recipeData?.imageUrl }} style={{ width: '100%', height: maxWidth * 0.4, borderRadius: 15 }} />

        <View style={styles.titleRow}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>{recipeData?.name}</Text>
          <Pressable onPress={handleToggleFavorite}>
            <Icon name={recipeData?.isFavorite ? 'heart' : 'heart-outline'} size={20} color={recipeData?.isFavorite ? '#FF0000' : '#000000'} />
          </Pressable>
        </View>
        <Text style={{ marginHorizontal: 20 }}>{recipeData?.description}</Text>
        <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'center', borderRightWidth: 1 }}>
            <Icon name='time-outline' size={20} color='#000000' style={{ marginRight: 20 }} />
            <Text style={{ fontWeight: '700' }}>{recipeData?.timeToCook}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'center' }}>
            <MCIcon name='chef-hat' size={20} color='#000000' style={{ marginRight: 20 }} />
            <Text style={{ fontWeight: '700', color: '#57B97D' }}>{recipeData?.favoriteCount} cooked</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: maxWidth * 0.8,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  titleRow: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
})