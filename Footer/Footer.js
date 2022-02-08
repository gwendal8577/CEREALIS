import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image
} from 'react-native';

//import { Modal } from 'react-native-web';
import './Footer.css';

import logoFB from '../assets/logoFB.png';
import logoTwitter from '../assets/logoTwitter.png';
import logoInsta from '../assets/logoInsta.jpg';

function Footer() {

    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState(null);

    return (
        <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Registration</Text>
            <TextInput
                style={styles.input}
              value={text}
              placeholder={'First Name'}
            />
            <TextInput
                style={styles.input}
              value={text}
              placeholder={'Email Adress'}
            />
            <Pressable
              style={[styles.button, styles.buttonValidate]}>
              <Text style={styles.textStyle}>Validate</Text>
            </Pressable>
            <View style={styles.images}>
                <Image source={logoFB} style={{width: 20, height: 20}}  />
                <Image source={logoTwitter} style={{width: 20, height: 20}}  />
                <Image source={logoInsta} style={{width: 20, height: 20}}  />
            </View>
            <Pressable
              style={[styles.button, styles.buttonRetour]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Retour</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonCapture]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Capture</Text>
      </Pressable>
    </View>
    )

}



const styles = StyleSheet.create({
    centeredView: {
      alignItems: 'center',
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      elevation: 2,
    },
    buttonCapture: {
      backgroundColor: '#5398D7',
      padding: 20,
    },
    buttonRetour: {
      backgroundColor: '#2196F3',
      padding: 5,
      margin: 2,
    },
    buttonValidate: {
      backgroundColor: '#5FE180',
      width: 150,
      height: 30,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }, 
  });


export default Footer