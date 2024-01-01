import { Colors } from '@/Theme/Variables';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RemovableChipProps {
  text: string;
  onRemove: (value: string) => void;
}

const RemovableChip: React.FC<RemovableChipProps> = ({ text, onRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icon name='close' size={20} color='#fff' onPress={() => onRemove(text)} />
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
