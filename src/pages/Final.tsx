import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

import AppLoading from 'expo-app-loading';
import { VerifyContext } from '../contexts/VerifyContext';
import { FontContext } from '../contexts/FontContext';
import { RouteProp } from '@react-navigation/native';

const images = [
  {
    id: 1,
    image: require('../../assets/icons/champagne.png'),
    name: 'champagne'
  },
  {
    id: 2,
    image: require('../../assets/icons/lollipop.png'),
    name: 'lollipop'
  },
  {
    id: 3,
    image: require('../../assets/icons/cheese.png'),
    name: 'cheese'
  },
  {
    id: 4,
    image: require('../../assets/icons/fast-food.png'),
    name: 'fast food'
  },
  {
    id: 5,
    image: require('../../assets/icons/french-fries.png'),
    name: 'french-fries'
  },
  {
    id: 6,
    image: require('../../assets/icons/beer.png'),
    name: 'beer'
  } 
];

type ParamsList = {
  Final: {
    sender: string;
    receiver: string;
    meal: string;
  }
}

type ScreenRouteProp = RouteProp<ParamsList, 'Final'>

interface Props {
  navigation: NativeStackNavigationHelpers;
  route: ScreenRouteProp;
}

function Final({ navigation, route }: Props) {
  const { fontsLoaded } = useContext(FontContext);
  const { verifyUserToken } = useContext(VerifyContext);

  useEffect(() => {
    verifyUserToken();
  }, []);

  function selectImage() {
    for(let img of images) {
      if (img.name === route.params.meal) {
        return (
          <Image source={img.image} style={styles.cardIcons} />
        );
      }
    }
  }

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
                { selectImage() }
              </View>
            </View>

            <View style={styles.cardMiddle}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>De: { route.params.sender }</Text>
              </View>

              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Para: { route.params.receiver }</Text>
              </View>
            </View>

            <View style={styles.cardSides}>
              <View style={styles.cardIconsContainer}>
              { selectImage() }
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
    height: 70,
    resizeMode: 'contain'
  }
})


export default Final;