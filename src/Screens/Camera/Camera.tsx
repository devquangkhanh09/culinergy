import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';
import { CameraScreens, MainScreens, RootScreens } from '..';
import { useAppDispatch } from '@/Hooks';
import { setImage } from '@/Store/reducers/camera';
import Icon from 'react-native-vector-icons/FontAwesome';

type CameraScreenNavigatorProps = {
  navigation: {
    navigate: (screen: CameraScreens | MainScreens) => void;
  };
};

export default function CameraScreen({
  navigation,
}: CameraScreenNavigatorProps) {
  var camera: Camera;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [cameraType, setCameraType] = React.useState<any>('back');
  const dispatch = useAppDispatch();

  useEffect(() => {
    __startCamera();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __savePhoto = () => {
    navigation.navigate(CameraScreens.SCANNER_RESULT);
    dispatch(setImage(capturedImage));
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const backToScreen = () => {
    navigation.navigate(MainScreens.HOME);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={__savePhoto}
            retakePicture={__retakePicture}
            backToScreen={backToScreen}
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
                  left: '5%',
                  top: '5%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={backToScreen}
                  style={{
                    marginTop: 20,
                    borderRadius: 25,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="chevron-left" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
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
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 10,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                    }}
                  />
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
