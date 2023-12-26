import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch } from "@/Hooks";
import { setToken, unsetFirstTime } from '@/Store/reducers';
import { MainScreens, RootScreens } from '..';

type FavoritesScreenNavigatorProps = {
  navigation: {
    navigate: (screen: RootScreens | MainScreens) => void;
  };
}

export const Favorites = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

