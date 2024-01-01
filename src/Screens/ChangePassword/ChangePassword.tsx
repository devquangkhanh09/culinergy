import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ChangePassword = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  return (
    <View style={styles.container}>
      <View style={{ height: 40, marginVertical: 30 }}></View>
      <TextInput
        style={{
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 25,
          marginBottom: 20,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 25,
          marginBottom: 20,
        }}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={{ alignItems: 'center' }}>
        <Pressable
          style={{ ...styles.button, backgroundColor: '#0E1E22' }}
        // onPress={handleLogin}
        >
          <Text
            style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>
            Change password
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  // button: {
  //   backgroundColor: '#ffffff',
  //   width: '100%',
  //   height: 46,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 23,
  //   boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  // },
  button: {
    backgroundColor: '#57B97D',
    width: 250,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
  },
});

export default ChangePassword;
