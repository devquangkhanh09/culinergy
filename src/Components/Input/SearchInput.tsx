import { Colors } from '@/Theme/Variables';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchInputProps {
  placeholder: string;
  prefixIcon: React.ReactNode;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, prefixIcon, onSearch }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (text: string) => {
    setValue(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.GRAY}
        value={value}
        onChangeText={handleInputChange}
      />
      <View style={{ position: 'absolute', left: 10, top: '30%', transform: [{ translateY: -0.5 }] }}>
        {prefixIcon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 40,
    width: '100%',
  },
});

export default SearchInput;
