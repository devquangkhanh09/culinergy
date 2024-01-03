import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import CameraPreview from './CameraPreview';
import { CameraScreens, MainScreens } from '..';
import { useAppDispatch } from '@/Hooks';
import { setImage } from '@/Store/reducers/camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Entypo';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

type CameraScreenNavigatorProps = {
  navigation: {
    navigate: (screen: CameraScreens | MainScreens) => void;
  };
};

export default function CameraScreen({
  navigation,
}: CameraScreenNavigatorProps) {
  var camera: Camera;
  const [isStartCamera, setIsStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [cameraType, setCameraType] = React.useState<any>('back');
  const maxWidth = Dimensions.get('window').width;
  const dispatch = useAppDispatch();

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setIsStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();

      const minWidth = 600;
      const maxWidth = 800;

      let newWidth = Math.min(Math.max(photo.width, minWidth), maxWidth);
      let newHeight = newWidth;

      const resizedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [
        { resize: { width: newWidth, height: newHeight } },
      ]);

      const base64Image = await FileSystem.readAsStringAsync(resizedPhoto.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setPreviewVisible(true);
      setCapturedImage({ base64: base64Image });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewVisible(true);
      setCapturedImage(result.assets[0]);
    }
  };

  const savePhoto = () => {
    navigation.navigate(CameraScreens.SCANNER_RESULT);
    dispatch(setImage(capturedImage));
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    startCamera();
  };

  const switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={savePhoto}
            retakePicture={retakePicture}
          />
        ) : (
          <Camera
            type={cameraType}
            style={{ flex: 1 }}
            ref={(r) => {
              if (r) camera = r;
            }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between',
                  backgroundColor: 'black',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 10,
                      borderRadius: 20,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="file-image" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 10,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></TouchableOpacity>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={switchCamera}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 10,
                      borderRadius: 50,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <EIcon name="cycle" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
