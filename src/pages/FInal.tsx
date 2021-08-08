import React, { useContext } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { FontContext } from '../contexts/FontContext';
import { LinearGradient } from 'expo-linear-gradient';

import AppLoading from 'expo-app-loading';

function Final() {
  const { fontsLoaded } = useContext(FontContext);

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor="#fff" />

        <View style={styles.about}>
          <Image source={require('../../assets/icons/check.png')} style={styles.icon} />

          <Text style={styles.resultText}>Seu correio foi enviado com sucesso</Text>
        </View>

        <View style={styles.cardContainer}>

          <View style={styles.card}>

            <View style={styles.cardSides}>
              <View style={styles.cardIconsContainer}>
                <Image source={require('../../assets/icons/fast-food.png')} style={styles.cardIcons} />
              </View>
            </View>

            <View style={styles.cardMiddle}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>De: Admirador Secreto</Text>
              </View>

              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Para: Você</Text>
              </View>
            </View>

            <View style={styles.cardSides}>
              <View style={styles.cardIconsContainer}>
                <Image source={require('../../assets/icons/fast-food.png')} style={styles.cardIcons} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  /* A B O U T */
  about: {
    width: '100%',
    height: '25%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 50,
    height: 50,

    marginBottom: 15
  },
  resultText: {
    fontSize: 30,
    lineHeight: 35,

    textAlign: 'center',
    fontFamily: 'Poppins-Medium',

    color: '#2F394B'
  },

  /* C A R D  C O N T A I N E R */
  cardContainer: {
    width: '100%',
    height: '75%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '80%',
    height: '85%',

    borderRadius: 20,

    backgroundColor: '#E06C88',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },

  cardSides: {
    height: '30%',
    alignItems: 'center',
    padding: 15,
  },

  cardMiddle: { /* M I D D L E  */
    padding: 10,

    flexDirection: 'row',
    justifyContent: 'center'

  },
  cardTextContainer: {
    width: '90%',

    transform: [{ rotate: '270deg' }]
  },
  cardText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
    color: '#E7DFDD',
    fontSize: 20,
  },

  cardIconsContainer: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 70,

    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcons: {
    width: 70,
    height: 70
  }
})


export default Final;