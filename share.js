import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';

import tough from 'tough-cookie'
import { useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';


function Footer() {

  const [modalVisible, setModalVisible] = useState(false);
  const [text] = React.useState(null);

  var name = '';
  var mail = '';

  const twitter = {
    html: '<a href="https://twitter.com/intent/tweet?hashtags=cerealis%2Ccoloring%2CAR&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false"><img src="http://twitter-badges.s3.amazonaws.com/t_logo-a.png" /></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
  };

  const { width } = useWindowDimensions();

  const onShare = async () => {
    try {
      let image = await AsyncStorage.getItem('image');
      Sharing.isAvailableAsync();
      await Sharing.shareAsync(image)
    } catch (error) {
      alert(error.message);
    }
  }

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
              name={'Name'}
              placeholder={'First Name'}
              onChangeText={(text) => name = text}
            />
            <TextInput
              style={styles.input}
              value={text}
              name={'Email'}
              placeholder={'Email Adress'}
              onChangeText={(text) => mail = text}
            />
            <Pressable style={[styles.buttonValidate]}
              onPress={()=> {registrateProspect(name,mail);setModalVisible(!modalVisible);}}>
              <Text style={styles.textStyleV}>Valider</Text>
            </Pressable>
            <TouchableOpacity style={[styles.buttonBack, styles.buttonGPlusStyle]} activeOpacity={0.5}>
              <Image source={{ uri: 'https://icon-library.com/images/social-network-icon/social-network-icon-23.jpg' }}
                style={styles.buttonImageIconStyle} />
              <Text style={styles.textStyle} onPress={() => onShare()}>Share</Text>
            </TouchableOpacity>
            <Pressable style={[styles.button, styles.buttonBack]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <Button style={[styles.buttonShare]} onPress={() => setModalVisible(true)} title="Share" />
      </View>
    </View>
  )
}

function registrateProspect(name,mail){
  var token 
  var myUrl = 'http://api.scrapestack.com/scrape?access_key=c9b0848b308efec47d76f40c3d7b297e&url=https://api.hubapi.com/contacts/v1/contact/';
  var myHeader = new Headers({
    'Authorization': 'Bearer pat-eu1-d148f997-e2dc-499e-a414-790662e47c15',
    'Content-Type': 'application/json'
  });
  var myBody = JSON.stringify({
    "properties": [
      {
        "property": "email",
        "value": mail
      },
      {
        "property": "firstname",
        "value": name
      }
    ]
  });
  fetch(myUrl,{
    method: 'POST',
    headers: myHeader,
    body: myBody
  }).then(Response => {
  })
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
    marginTop: 10,
    width: 150,
    height: 40,
  },
  buttonValidate: {
    backgroundColor: '#5FE180',
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
    textAlign: 'center',
    fontSize: 22
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    color: 'white'
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
});

export default Footer