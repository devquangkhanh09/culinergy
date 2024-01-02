import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useAppSelector } from '@/Hooks';

import CustomButton from '@/Components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { CameraScreens } from '..';
import IngredientsList from './IngredientsList/IngredientsList';
import axios from 'axios';

export default function ScannerScreen() {
  const camera = useAppSelector((state) => state.camera);

  const screenHeight = Dimensions.get('window').height;
  const targetHeight = screenHeight * 0.4;
  const imageUrl = camera.imageUrl.base64;
  const navigator = useNavigation<any>();

  useEffect(() => {
    if (!camera.imageUrl.base64) return;

    const sendImageToScanner = async () => {
      try {
        const response = await axios.post(
          'https://culinergy-ai.hungnhb.dev/detect',
          {
            image: camera.imageUrl.base64,
          }
        );

        console.log('Scanner Response:', response.data);
      } catch (error) {
        console.error('Scanner Error:', error);
      }
    };

    sendImageToScanner();
  }, [camera]);

  const ingredients = [
    {
      id: 1,
      name: 'Chicken',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Onion',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'Grape',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      name: 'Cheenen',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      name: 'Mustard',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      name: 'Mayonaise',
      image: 'https://picsum.photos/200/300',
    },
  ];

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
        <IngredientsList dataSource={ingredients} />
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
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
