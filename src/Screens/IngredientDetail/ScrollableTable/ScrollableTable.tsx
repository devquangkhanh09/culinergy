import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

interface NutritionData {
  nutrition: string;
  amount: string;
}

interface ScrollableTableProps {
  data: NutritionData[];
}

const ScrollableTable = ({ data }: ScrollableTableProps) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Nutrition</Text>
      <Text style={styles.headerText}>Amount</Text>
    </View>
  );

  const renderRow = ({
    item,
    index,
  }: {
    item: NutritionData;
    index: number;
  }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={styles.cell}>{item.nutrition}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full height
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    marginVertical: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  evenRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ScrollableTable;
