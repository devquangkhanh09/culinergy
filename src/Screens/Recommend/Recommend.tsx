import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { RecommendCard } from './RecommendCard/RecommendCard';

export default function Recommend() {
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
});
