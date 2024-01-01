import Badge from '@/Components/Badge/Badge';
import React, { useState } from 'react';
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

export default function RecipeDetail() {
  const imageUrl = 'https://picsum.photos/200/300';
  const [isHeartClicked, setHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setHeartClicked(!isHeartClicked);
  };
  const badge = [
    { id: 1, name: 'Spicy' },
    { id: 2, name: 'Low Fat' },
    { id: 3, name: 'High Crab' },
  ];
  const ingredients = [
    { id: 1, name: 'Chicken' },
    { id: 2, name: 'Grape' },
    { id: 3, name: 'Eggs' },
    { id: 4, name: 'Apple' },
  ];

  const instructions = [
    { id: 1, name: 'Step 1. Boil the water' },
    { id: 2, name: 'Step 2. Add pasta and cook for 10 minutes' },
    { id: 3, name: 'Step 3. Chop the vegetables' },
    { id: 4, name: 'Step 4. Mix pasta and vegetables together' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={handleHeartClick}>
          <Icon
            name={isHeartClicked ? 'heart' : 'heart-o'}
            size={40}
            color={isHeartClicked ? 'red' : '#000'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeHeader}>Chicken soup Allan Pasta</Text>
        <View style={styles.content}>
          <View style={styles.flexBetween}>
            <Icon name="clock-o" size={30} color="#000" style={styles.icon} />
            <Text style={styles.text}>15 mins</Text>
          </View>
          <View style={styles.flexBetween}>
            <MCIcon
              name="chef-hat"
              size={30}
              color="#000000"
              style={styles.icon}
            />
            <Text style={styles.text}>69 cooked</Text>
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Tags</Text>
          <View style={styles.badgeList}>
            {badge.map((item) => (
              <View key={item.id} style={styles.badgeItem}>
                <Badge id={item.id} name={item.name} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Ingredients</Text>
          <View>
            {ingredients.map((item) => (
              <View key={item.id}>
                <Text style={styles.textItem}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.contentList}>
          <Text style={styles.textSubHeader}>Instructions</Text>
          <View>
            {instructions.map((item) => (
              <View key={item.id}>
                <Text style={styles.textItem}>{item.name}</Text>
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
