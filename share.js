import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button
} from 'react-native';

import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

/* import logoFB from './assets';
import logoTwitter from '../assets/logoTwitter.png';
import logoInsta from '../assets/logoInsta.jpg'; */

function Footer() {

  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState(null);

  const twitter = {
    html: '<a href="https://twitter.com/intent/tweet?hashtags=cerealis%2Ccoloring%2CAR&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false"><img src="http://twitter-badges.s3.amazonaws.com/t_logo-a.png" /></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
  };
  /*const facebook = {
    html: '<a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugin%2F&amp;src=sdkpreparse" target="_blank">Facebook</a>'
  }*/
  /*const instagram = {
    html: '<a href="https://www.instagram.com/">Instagram</a><script async src="//www.instagram.com/embed.js"></script>'
  }*/
  const { width } = useWindowDimensions();

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
            <Pressable style={[styles.buttonValidate]}>
              <Text style={styles.textStyleV}>Valider</Text>
            </Pressable>
            <RenderHTML
              contentWidth={width}
              source={twitter}
            />
            <Pressable style={[styles.button, styles.buttonBack]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <Button style={[styles.buttonShare]} onPress={() => setModalVisible(true)} title="Partager" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
  },
  modalView: {
    margin: 130,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    elevation: 2,
  },
  buttonShare: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttonCapture: {
    backgroundColor: '#5398D7',
    padding: 20,
  },
  buttonBack: {
    backgroundColor: '#2196F3',
    padding: 5,
    margin: 2,
    marginTop: 10
  },
  buttonValidate: {
    backgroundColor: '#5FE180',
    width: 150,
    height: 30,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  textStyleV: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Footer