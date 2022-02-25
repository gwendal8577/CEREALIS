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
            />
            <TextInput
              style={styles.input}
              value={text}
              name={'Email'}
              placeholder={'Email Adress'}
            />
            <Pressable style={[styles.buttonValidate]}
              onPress={() => registrateProspect()}>
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
function registrateProspect(){
  var token 
  var myUrl = 'http://192.168.1.40:8087/axelor-erp/callback';
  var myHeader = new Headers({
    'Authorization': 'basic '+'admin:admin',
    'Content-Type':'application/json'
  });
  var myBody = JSON.stringify({'username':'admin','password':'admin'});
  fetch(myUrl,{
    method: 'POST',
    headers: myHeader,
    body: myBody
  }).then(Response => {
    createProspect()
  })
}

function createProspect(){
  var cookiejar = new tough.CookieJar
  cookiejar.setCookie('X-CSRF-Token=1c6b3438-bfeb-4f3b-9b49-bdab7a81b5e8','192.168.1.40:8087/axelor-erp',function(err,cookies) {
  });
  cookiejar.setCookie('JSESSIONID=B7D06FF36CFBEFBD4665F7F6FF43F437','192.168.1.40:8087/axelor-erp',function(err,cookies) {
  });
  var mail = document.getElementsByName('Email');
  var name = document.getElementsByName('Name');
  var myUrl = 'http://localhost:8087/axelor-erp/ws/rest/com.axelor.apps.base.db.Partner';
  var myHeader = new Headers({
    'Authorization': 'basic '+'admin:admin',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  var myBody = JSON.stringify({'data':{'invoicesCopySelect':1,'isCarrier':false,'chargeBackPurchaseSelect':0,'isEmployee':false,'groupProductsOnPrintings':false,'factorizedCustomer':false,'supplierArrivalProductQty':'0','chargeBackPurchase':'100','isIspmRequired':false,'isProspect':true,'saleTurnover':0,'supplierQualityRatingSelect':'0','isSupplier':false,'isNeedingConformityCertificate':false,'partnerTypeSelect':2,'titleSelect':0,'payerQuality':'0','supplierQualityRating':'0','isSubcontractor':false,'nbrEmployees':0,'isInternal':false,'isContact':false,'paymentDelay':'0','isFactor':false,'deliveryDelay':0,'isCustomer':false,'currency':null,'language':null,'invoiceSendingFormatSelect':'emailpaper','team':null,'user':{'code':'admin','fullName':'Administrator','id':1},'companySet':null,'outPaymentMode':null,'inPaymentMode':null,'paymentCondition':null,'name':name,'simpleFullName':name,'fullName':name,'emailAddress':{'address':mail}}});

  fetch(myUrl,{
    method: 'PUT',
    headers: myHeader,
    body: myBody
   })
    .then(Response => {
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