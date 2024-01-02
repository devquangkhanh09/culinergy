import React, { useState } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GeneralModal from './GeneralModal';
import SearchInput from '../Input/SearchInput';
import { useAppSelector, useAppDispatch } from '@/Hooks';

export interface SelectItem {
  _id: number;
  name: string;
}

interface SelectionModalProps {
  isVisible: boolean;
  title: string;
  options: SelectItem[];
  storeKey: 'explore';
  reducer: any;
  onSelectionComplete: () => void;
}

// TODO: refactor this component to be more reusable
const SelectionModal: React.FC<SelectionModalProps> = ({ isVisible, title, options, storeKey, reducer, onSelectionComplete }) => {
  const [search, setSearch] = useState('');

  const selectedOptions = useAppSelector(state => state[storeKey].selectedIngredients);
  const dispatch = useAppDispatch();

  const toggleOption = (option: SelectItem) => {
    dispatch(reducer(option));
  };

  const filteredOptions = options.filter(option => option.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }: { item: SelectItem }) => (
    <TouchableOpacity style={styles.selectItem} onPress={() => toggleOption(item)}>
      <Text style={styles.selectItemText}>{item.name}</Text>
      {selectedOptions.includes(item) && <Icon name='checkmark' size={20} color='#000' />}
    </TouchableOpacity>
  );

  return (
    <GeneralModal 
      isVisible={isVisible} 
      title={title}
      onOk={() => {
        setSearch('');
        onSelectionComplete();
      }}
    >
      <View>
        <SearchInput
          placeholder='Enter ingredient name'
          prefixIcon={<Icon name='search' size={20} color='#000' />}
          onSearch={(text) => setSearch(text)}
        />
        <FlatList
          style={styles.list}
          data={filteredOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </GeneralModal>
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: 300,
  },
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 40,
    borderEndWidth: 1,
  },
  selectItemText: {
    fontSize: 16,
  },
});

export default SelectionModal;