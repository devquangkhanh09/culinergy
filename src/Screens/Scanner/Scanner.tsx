import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useAppSelector } from '@/Hooks';
import CameraPreview from '../Camera/CameraPreview';

export default function ScannerScreen() {
  const camera = useAppSelector((state) => state.camera);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingredients Detect</Text>
      <CameraPreview photo={camera.imageUrl} isDisable={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
