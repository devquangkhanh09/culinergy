import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MainScreens } from '@/Screens';
import { useAppDispatch } from '@/Hooks';
import { setIngredientByID } from '@/Store/reducers/ingredient';

export interface IngredientProps {
  ingredient_id: number;
  image: string;
  name: string;
}

interface IngredientListProps {
  ingredientList?: IngredientProps[];
}

const IngredientsList = ({ ingredientList }: IngredientListProps) => {
  const navigator = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowIndicator(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleClickIngredient = (item: any) => {
    dispatch(setIngredientByID(item.ingredient_id));
    navigator.navigate(MainScreens.INGREDIENT_DETAIL);
  };

  const renderItem = ({ item }: { item: IngredientProps }) => (
    <Pressable
      onPress={() => handleClickIngredient(item)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? '#ddd' : '#fff',
        },
      ]}>
      <Image
        source={{ uri: `data:image/png;base64,${item.image}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {showIndicator ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#000"
        />
      ) : (
        <>
          {ingredientList && ingredientList.length > 0 ? (
            <FlatList
              data={ingredientList}
              keyExtractor={(item, index) =>
                index.toString()
              }
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.notFound}>No ingredients detected</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.7,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  notFound: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IngredientsList;
