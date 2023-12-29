import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ id, name }: any) => (
  <View style={styles.badge}>
    <Text style={styles.text}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#57B97D',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
