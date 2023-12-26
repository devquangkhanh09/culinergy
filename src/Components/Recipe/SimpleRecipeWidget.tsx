import { Colors } from "@/Theme/Variables";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface SimpleRecipeWidgetProps {
  img: any;
  name: string;
}

const SimpleRecipeWidget: React.FC<SimpleRecipeWidgetProps> = ({ img, name }) => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
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