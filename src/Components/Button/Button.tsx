import { Colors } from '@/Theme/Variables';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomButton = ({ title, onPress, style, isLoading }: any) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {isLoading 
        ? <ActivityIndicator size="small" color="#fff" />
        : <Text style={styles.buttonText}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
  },
});

export default CustomButton;
