import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

const CameraPreview = ({ photo, retakePicture, savePhoto, isDisable }: any) => {
  const [imageHeight, setImageHeight] = useState(300);
  const maxWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isFullScreen = imageHeight >= screenHeight;

  useEffect(() => {
    if (photo && photo.base64) {
      Image.getSize(
        `data:image/jpeg;base64,${photo.base64}`,
        (width, height) => {
          setImageHeight(height);
        }
      );
    }
  }, [photo]);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: maxWidth,
        height: maxWidth,
      }}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${photo && photo.base64}` }}
        style={{
          flex: 1,
          height: !isFullScreen ? imageHeight : undefined,
          alignItems: 'center',
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 15,
          justifyContent: 'flex-end',
        }}>
        {!isDisable && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}>
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                padding: 10,
                backgroundColor: '#57B97D',
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}>
                Save photo
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CameraPreview;
