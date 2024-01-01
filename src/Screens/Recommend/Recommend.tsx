import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import React from 'react';
import { RecommendCard } from './RecommendCard/RecommendCard';
import CustomButton from '@/Components/Button/Button';
import { MainScreens } from '..';
import { useNavigation } from '@react-navigation/native';

export default function Recommend() {
  const navigator = useNavigation<any>();
  const recommendData = [
    {
      id: 1,
      title: 'Tomato pasta',
      subTitle:
        'Tasty traditional dish. Not only for Italian who when to Malta',
      badge: [
        { id: 1, name: 'Grape' },
        { id: 2, name: 'Chicken' },
      ],
      time: '45 mins',
    },
    {
      id: 2,
      title: 'Chicken soup',
      subTitle:
        'Tasty traditional dish. Not only for Italian who when to Malta',
      badge: [
        { id: 1, name: 'Grape' },
        { id: 2, name: 'Chicken' },
        { id: 3, name: 'Apple' },
      ],
      time: '15 mins',
    },
    {
      id: 3,
      title: 'Chicken soup',
      subTitle:
        'Tasty traditional dish. Not only for Italian who when to Malta',
      badge: [
        { id: 1, name: 'Grape' },
        { id: 2, name: 'Chicken' },
        { id: 3, name: 'Apple' },
      ],
      time: '15 mins',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Great! Here are the recommended recipes.
      </Text>
      <Text style={styles.textSubHeader}>
        Pick one and become a master chef!
      </Text>
      <FlatList
        data={recommendData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecommendCard data={item} />}
      />
      <CustomButton
        title="Back to Home"
        style={styles.customButton}
        onPress={() => navigator.navigate(MainScreens.HOME)}
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
