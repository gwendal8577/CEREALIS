import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Camera } from 'expo-camera';

export default function App() {
  return (
      <>
        <Header />
        <View style={styles.container}>
          <Text>test</Text>
          <StatusBar style="auto" />
        </View>
        <Footer />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
