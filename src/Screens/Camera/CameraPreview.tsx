import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  isDisable,
  width,
  height,
  padding,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: width || '100%',
        height: height || '100%',
        padding: padding || 0,
      }}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}>
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
                  width: 130,
                  height: 40,

                  alignItems: 'center',
                  borderRadius: 4,
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
                  width: 130,
                  height: 40,

                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                  }}>
                  save photo
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
