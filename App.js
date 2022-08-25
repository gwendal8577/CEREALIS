import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Footer from './share';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type] = useState(Camera.Constants.Type.back); useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // sert à prendre une photo
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      console.log(data.uri);
      await AsyncStorage.setItem('image', data.uri)
    }
  }

  const back = async () => {
    if (!camera) {
      setImage(null);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>
          CEREALIS
        </Text>
      </View>
      {!image ? <Camera
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={type}
        ratio={'1:1'}
      /> : null}
      {image ? <Image source={{ uri: image }} style={{ flex: 1 }} /> : null}
      {!image ? <View style={styles.buttonRond}>
        <View style={styles.buttonRond2}>
          <TouchableOpacity onPress={() => takePicture()} style={styles.buttoncapture} />
        </View>
      </View> : null}
      {image ? <Footer /> : null}
      {image ? <TouchableOpacity style={styles.back} onPress={() => { back() }}>
        <Text style={styles.text}> Back </Text>
      </TouchableOpacity> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
    backgroundColor: '#f6cb46'
  },
  textStyle: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24
  },
  buttonRond: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  buttonRond2: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  buttoncapture: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'grey'
  },
  back: {
    position: 'absolute',
    top: 100,
    right: 0,
    backgroundColor: 'grey'
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});