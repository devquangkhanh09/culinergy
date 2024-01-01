import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import ScrollableTable from './ScrollableTable/ScrollableTable';

export default function IngredientDetail() {
  const data = [
    { nutrition: 'Protein', amount: '20g' },
    { nutrition: 'Carbohydrates', amount: '30g' },
    { nutrition: 'Fiber', amount: '10g' },
    { nutrition: 'Fat', amount: '15g' },
    { nutrition: 'Vitamin A', amount: '500 IU' },
    { nutrition: 'Vitamin C', amount: '30mg' },
    { nutrition: 'Calcium', amount: '200mg' },
    { nutrition: 'Iron', amount: '5mg' },
    { nutrition: 'Sodium', amount: '400mg' },
    { nutrition: 'Potassium', amount: '300mg' },
    { nutrition: 'Magnesium', amount: '50mg' },
    { nutrition: 'Zinc', amount: '3mg' },
    { nutrition: 'Phosphorus', amount: '250mg' },
    { nutrition: 'Biotin', amount: '30mcg' },
    { nutrition: 'Folate', amount: '400mcg' },
    { nutrition: 'Niacin', amount: '20mg' },
    { nutrition: 'Riboflavin', amount: '2mg' },
    { nutrition: 'Thiamine', amount: '1.5mg' },
    { nutrition: 'Pantothenic Acid', amount: '10mg' },
  ];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHeader}>Chicken</Text>
        <Text style={styles.textSubHeader}>
          Pellentesque viverra congue neque, nec elementum elit posuere id.
          Curabitur.
        </Text>
        <ScrollableTable data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSubHeader: {
    width: Dimensions.get('window').width * 0.8,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
