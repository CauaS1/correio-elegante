import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

function Final() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />

      <View style={styles.about}>
        <Text>Eae</Text>

        <Text>Seu correio foi enviado com sucesso</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Final;