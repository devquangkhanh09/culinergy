import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScrollableTable from './ScrollableTable/ScrollableTable';
import { useLazyGetIngredientQuery } from '@/Services/ingredients';
import { useAppSelector } from '@/Hooks';

export default function IngredientDetail() {
  const ingredient = useAppSelector((state) => state.ingredient);

  const [getIngredientByID] = useLazyGetIngredientQuery();
  const [ingredientDetail, setIngredientDetail] = useState<any>(null);

  useEffect(() => {
    if (ingredient.ingredientID === 0) return;

    const fetchIngredientDetail = async () => {
      try {
        const result = await getIngredientByID(ingredient.ingredientID);
        setIngredientDetail(result);
      } catch (error) {
        console.error('Error fetching ingredient details:', error);
      }
    };

    fetchIngredientDetail();
  }, [getIngredientByID, ingredient.ingredientID]);

  const data = ingredientDetail
    ? Object.entries(ingredientDetail.data.nutritionInfo).map(
        ([nutrition, amount]) => ({
          nutrition,
          amount: amount as string,
        })
      )
    : [];

  return (
    <View style={styles.container}>
      <View>
        {ingredientDetail && (
          <>
            <Text style={styles.textHeader}>{ingredientDetail.data.name}</Text>
            <Text style={styles.textSubHeader}>
              {ingredientDetail.data.description}
            </Text>
          </>
        )}
        {data.length > 0 && <ScrollableTable data={data} />}
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
