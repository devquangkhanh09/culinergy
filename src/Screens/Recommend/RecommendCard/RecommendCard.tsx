import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import Badge from '@/Components/Badge/Badge';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { CameraScreens } from '@/Screens';

interface RecommendCardProps {
  data: {
    id: number;
    title: string;
    subTitle: string;
    badge: { id: number; name: string }[];
    time: string;
  };
}

export const RecommendCard = ({ data }: RecommendCardProps) => {
  const navigator = useNavigation<any>();
  const handlePress = () => {
    navigator.navigate(CameraScreens.RECIPE_DETAIL);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}>
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style={styles.image}
      />
      <View style={styles.textRecommendBlock}>
        <Text style={styles.textRecommendHeader}>{data.title}</Text>
        <Text style={styles.textRecommendDescription}>{data.subTitle}</Text>
        <View style={styles.badgeList}>
          {data.badge.map((item) => (
            <View key={item.id} style={styles.badgeItem}>
              <Badge id={item.id} name={item.name} />
            </View>
          ))}
        </View>
        <View style={styles.flexBetween}>
          <View style={styles.flexBetween}>
            <Icon name="clock-o" size={20} />
            <Text style={styles.time}>{data.time}</Text>
          </View>
          <View></View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginVertical: 20,
  },
  containerPressed: {
    backgroundColor: 'lightgray',
  },
  image: {
    width: 175,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  textRecommendBlock: {
    flexDirection: 'column',
    width: Dimensions.get('window').width * 0.45,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textRecommendHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textRecommendDescription: {
    fontSize: 14,
    marginTop: 10,
  },
  badgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  badgeItem: {
    marginBottom: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});