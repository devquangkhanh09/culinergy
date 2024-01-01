import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

const CameraPreview = ({ photo, retakePicture, savePhoto, isDisable }: any) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 0,
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
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
