import { CameraScreens } from '@/Screens';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DataSource {
  id: number;
  name: string;
  image: string;
}

interface IngredientsProps {
  dataSource: DataSource[];
}

const IngredientsList = ({ dataSource }: IngredientsProps) => {
  const navigator = useNavigation<any>();
  const renderItem = ({ item }: { item: DataSource }) => (
    <Pressable
      onPress={() => navigator.navigate(CameraScreens.INGREDIENT_DETAIL)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? '#ddd' : '#fff',
        },
      ]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Icon name="chevron-right" size={20} color="gray" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
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
    padding: 10,
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
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    fontSize: 20,
  },
});

export default IngredientsList;
