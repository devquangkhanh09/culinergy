import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useAppSelector } from '@/Hooks';

import CustomButton from '@/Components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { CameraScreens } from '..';

import axios from 'axios';
import { useLazyGetIngredientQuery } from '@/Services/ingredients';
import IngredientsList, {
  IngredientProps,
} from './IngredientsList/IngredientsList';

export default function ScannerScreen() {
  const camera = useAppSelector((state) => state.camera);
  const screenHeight = Dimensions.get('window').height;
  const targetHeight = screenHeight * 0.4;
  const imageUrl = camera.imageUrl.base64;
  const navigator = useNavigation<any>();

  const [getIngredientByID] = useLazyGetIngredientQuery();
  const [ingredientList, setIngredientList] = useState<IngredientProps[]>([]);

  useEffect(() => {
    if (!camera.imageUrl.base64) return;

    const preProcessingList = async (ingredientList: any) => {
      const newArray = [];

      for (const obj of ingredientList) {
        const ingredientName = await getIngredientByID(obj.ingredient_id);
        newArray.push({
          ...obj,
          name: ingredientName.data?.name,
        });
      }

      return newArray;
    };

    const sendImageToScanner = async () => {
      try {
        const response = await axios.post(
          'https://culinergy-ai.hungnhb.dev/detect',
          {
            image: camera.imageUrl.base64,
          }
        );
        const newData = await preProcessingList(response.data);
        setIngredientList(newData);
        console.log('Scanner Data:', newData);
      } catch (error) {
        console.error('Scanner Error:', error);
      }
    };

    sendImageToScanner();
  }, [camera]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${imageUrl}` }}
        style={{ width: '100%', height: targetHeight }}
        resizeMode="cover"
      />

      <View style={styles.ingredientsList}>
        <View style={styles.ingredientsBlock}>
          <Text style={styles.ingredientsText}>Detected Ingredients</Text>
        </View>
        <IngredientsList
          originalImage={imageUrl && imageUrl}
          ingredientList={ingredientList ? ingredientList : []}
        />
      </View>
      <CustomButton
        title="See Recipes"
        style={styles.customButton}
        onPress={() => navigator.navigate(CameraScreens.RECOMMENDATION)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ingredientsBlock: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#CBCBCB',
  },
  ingredientsText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  ingredientsList: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.8,
    marginHorizontal: 'auto',
    flex: 1,
  },
  customButton: {
    marginVertical: 25,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#57B97D',
    color: '#fff',
    borderRadius: 25,
  },
});
