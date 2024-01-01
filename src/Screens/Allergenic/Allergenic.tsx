import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import SelectionModal from '@/Components/Modal/SelectionModal';
import { toggleIngredient } from '@/Store/reducers';

const sampleIngredients = [
  'Chicken',
  'Beef',
  'Pork',
  'Fish',
  'Shrimp',
  'Egg',
  'Milk',
  'Cheese',
  'Potato',
  'Carrot',
  'Tomato',
]

export default function Allergenic() {
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);

  const handleSelectionComplete = () => {
    setIsIngredientModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 15, borderColor: 'rgba(173, 173, 173, 0.50)', borderWidth: 1 }}>
        <View style={{ height: 50, backgroundColor: '#ffffff', paddingLeft: 20, justifyContent: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Text>Crab</Text>
        </View>
        <View style={{ height: 50, backgroundColor: '#F1F1F1', paddingLeft: 20, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14 }}>Milk</Text>
        </View>
        <Pressable onPress={() => setIsIngredientModalVisible(true)} style={{ height: 50, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
          <Image
            source={require('../../../assets/settings/add-allergenic.png')}
            style={{ height: 20, width: 20, marginLeft: 20, marginRight: 10 }}
          />
          <Text style={{ color: '#57B97D' }}>Add more allergenic ingredient</Text>
        </Pressable>
        <SelectionModal
          isVisible={isIngredientModalVisible}
          title='Select ingredients'
          options={sampleIngredients}
          storeKey='explore'
          reducer={toggleIngredient}
          onSelectionComplete={handleSelectionComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
