import { Recipe } from "@/Services/recipes";
import { Colors } from "@/Theme/Variables";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraScreens, MainScreens } from "@/Screens";

interface SimpleRecipeWidgetProps {
  data: Recipe;
}

const SimpleRecipeWidget: React.FC<SimpleRecipeWidgetProps> = ({ data }) => {
  const navigation = useNavigation<any>();

  const navigateToRecipeDetail = () => {
    navigation.navigate(MainScreens.CAMERA, {
      screen: CameraScreens.RECIPE_DETAIL,
      params: { recipeId: data._id }
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateToRecipeDetail}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{data.name}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
  },
})

export default SimpleRecipeWidget;