import React from 'react';
import { Pressable } from 'react-native';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { Colors } from '@/Theme/Variables';

interface GeneralModalProps {
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
  onOk: () => void;
}

const GeneralModal: React.FC<GeneralModalProps> = ({ isVisible, title, onOk, children }) => {
  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={isVisible} 
      onRequestClose={onOk}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          {children}
          <Pressable onPress={onOk}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>OK</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 40,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.PRIMARY_DARK,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  btnText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GeneralModal;