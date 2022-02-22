import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera'; 
import Footer from './share';

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
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      console.log(data.uri);
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
          CÉRÉALIS
        </Text>
      </View>
      {!image ? <Camera
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={type}
        ratio={'1:1'}
      /> : null}
      {image ? <Image source={{ uri: image }} style={{ flex: 1 }} /> : null}
      {!image ? <Button title="Capture" onPress={() => takePicture()} /> : null}
      {image ? <Footer /> : null}
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
  }
});