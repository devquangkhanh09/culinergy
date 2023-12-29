import { StyleSheet, View } from "react-native";

export const ChangePassword = () => {
  return (
    <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
  },
});