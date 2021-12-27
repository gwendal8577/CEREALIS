import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import OpenCamera from './camera';

export default function App() {
  return (
      <>
        <Header />
        <View style={styles.container}>
          <StatusBar style="auto" />
          <OpenCamera />
        </View>
        <Footer />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
