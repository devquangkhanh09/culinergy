import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const CameraPreview = ({
  photo,
  retakePicture,
  savePhoto,
  isDisable,
  backToScreen,
}: any) => {
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
          {backToScreen && (
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
          )}

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
