import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectionModal from '@/Components/Modal/SelectionModal';
import { useLazyGetIngredientsQuery } from '@/Services/ingredients';
import { useUpdateProfileMutation } from '@/Services';
import { toggleAllergy } from '@/Store/reducers';
import { useAppSelector, useAppDispatch } from '@/Hooks';

export default function Allergenic() {
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const [fetchIngredients, { data: ingredientsData }] = useLazyGetIngredientsQuery();
  const allergenicIngredients = useAppSelector(state => state.user.profile.allergies);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const handleSelectionComplete = () => {
    setIsIngredientModalVisible(false);
    updateProfile({
      allergies: allergenicIngredients.map((ingredient) => ingredient._id),
    });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (isIngredientModalVisible) return;

    updateProfile({
      allergies: allergenicIngredients.map((ingredient) => ingredient._id),
    });
  }, [allergenicIngredients]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ borderRadius: 15, borderColor: 'rgba(173, 173, 173, 0.50)', borderWidth: 1 }}>
        {allergenicIngredients.map((ingredient, idx) => (
          <View key={ingredient._id} style={{ height: 50, backgroundColor: idx % 2? '#f2f2f2' : '#ffffff', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{ingredient.name}</Text>
            <Pressable onPress={() => dispatch(toggleAllergy(ingredient))}>
              <Image
                source={require('../../../assets/settings/delete-allergenic.png')}
                style={{ height: 20, width: 20 }}
              />
            </Pressable>
          </View>
        ))}
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
          options={ingredientsData ? ingredientsData : []}
          storeCode='ingredients-allergenic'
          reducer={toggleAllergy}
          onSelectionComplete={handleSelectionComplete}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
