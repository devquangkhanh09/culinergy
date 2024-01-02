import { Colors } from '@/Theme/Variables';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectItem } from '../Modal/SelectionModal';

interface RemovableChipProps {
  item: SelectItem;
  onRemove: (item: SelectItem) => void;
}

const RemovableChip: React.FC<RemovableChipProps> = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <Icon name='close' size={20} color='#fff' onPress={() => onRemove(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  text: {
    color: '#fff',
    marginRight: 5,
  },
});

export default RemovableChip;
