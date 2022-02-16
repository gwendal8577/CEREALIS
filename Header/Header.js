import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        CÉRÉALIS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default App;