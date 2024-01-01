import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

var maxWidth = Dimensions.get('window').width;

export const BigRecipeWidget = ({ data }: { data: any }) => {
  const [recipeData, setRecipeData] = useState(data)

  return (
    <View style={styles.container}>
      <Image source={recipeData.img} style={{ width: '100%', height: maxWidth * 0.4, borderRadius: 15 }} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 10,
          height: 40
        }}>
        <Text style={{ fontSize: 15, fontWeight: '700' }}>{recipeData.name}</Text>
        <Pressable onPress={() => setRecipeData({ ...recipeData, isLike: !recipeData.isLike })}>
          <Icon name={recipeData.isLike ? 'heart' : 'heart-outline'} size={20} color={recipeData.isLike ? '#FF0000' : '#000000'} />
        </Pressable>
      </View>
      <Text style={{ marginHorizontal: 20 }}>Tasty traditional dish. Not only for Italian who when to Malta</Text>
      <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'center', borderRightWidth: 1 }}>
          <Icon name='time-outline' size={20} color='#000000' style={{ marginRight: 20 }} />
          <Text style={{ fontWeight: '700' }}>15 mins</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'center' }}>
          <MCIcon name='chef-hat' size={20} color='#000000' style={{ marginRight: 20 }} />
          <Text style={{ fontWeight: '700', color: '#57B97D' }}>69 cooked</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: maxWidth * 0.8,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
  }
})