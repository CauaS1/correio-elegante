import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontContext } from '../contexts/FontContext';

import AppLoading from 'expo-app-loading';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

interface Props {
  navigation: NativeStackNavigationHelpers;
}

function Home({ navigation }: Props) {
  const { fontsLoaded } = useContext(FontContext);

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} backgroundColor="#b73058" />

        <LinearGradient
          colors={['#b73058', '#E06C88']}
          style={styles.container}
        >
          <View style={styles.imageContent}>
            <View style={styles.circle}>
              <Image source={require('../../assets/icons/Logo.png')} />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Surpreenda seu amor</Text>
            <Text style={styles.about}>Envie mensagens e presente incriveis.</Text>

            <TouchableOpacity style={styles.startButton} onPress={() => {
              navigation.navigate('Account')
            }} >
              <Text style={styles.buttonTxt}>Começar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b73058',

    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  /* Top Circle */
  imageContent: {
    width: '100%',
    height: '50%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',

    borderRadius: 200,

    alignItems: 'center',
    justifyContent: 'center'
  },

  /* Bottom content */
  content: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',

    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,

    borderTopEndRadius: 30,
    borderTopStartRadius: 30,

    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 40,
    color: '#2f394b',
    textAlign: 'center',

    fontFamily: 'Poppins-Medium',
  },
  about: {
    color: '#9cabc2',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },

  // Button
  startButton: {
    width: '85%',
    height: 60,

    marginTop: 30,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E06C88'
  },
  buttonTxt: {
    fontSize: 28,
    color: '#fff',

    fontFamily: 'Courgette-Regular',
  }

})

export default Home;

// Rosa Escuro: #B73058
// Rosa Claro: #E06C88
// Cinza: #8D8D8D
// Cinza Escuro: #2F394B
// Cinza Claro: #9CABC2
// Para as fontes: #E7DFDD