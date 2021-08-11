import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontContext } from '../contexts/FontContext';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

import AppLoading from 'expo-app-loading';
import { VerifyContext } from '../contexts/VerifyContext';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface Props {
  navigation: NativeStackNavigationHelpers;
}

function MessageRegister({ navigation }: Props) {
  const { fontsLoaded } = useContext(FontContext);
  const { verifyUserToken } = useContext(VerifyContext);

  const [selected, setSelected] = useState<boolean>();
  const [optionIndex, setOptionIndex] = useState<number>();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [meal, setMeal] = useState('beer');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });
  }, [optionIndex]);

  useEffect(() => {
    verifyUserToken();
  }, []);

  async function sendMail() {
    const senderId = await AsyncStorage.getItem('user_id');

    try {
      await api.post('/mail', {
        senderId: senderId,
        sender: senderName,
        message: message,
        meal: meal,
        receiver: receiver
      });

      setReceiver('');
      setMeal('');
      setMessage('');
      setSenderName('');
      setSelected(false);

      navigation.navigate('Final', {
        sender: senderName,
        receiver: receiver,
        meal: meal
      });

    } catch (err) {
      console.log(err);
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View>
        <StatusBar translucent={false} backgroundColor="#b73058" barStyle="light-content" />

        <LinearGradient
          colors={['#b73058', '#E06C88']}
          style={styles.container}
        >
          <View style={styles.header}>
            {!isKeyboardVisible ? (
              <View style={{ width: '100%', height: 25, alignItems: 'flex-end', justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Image source={require('../../assets/icons/bell.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={{ width: '100%' }}>
              <Text style={styles.headerTitle}>Você gostaria de se identificar?</Text>
              <TextInput placeholder="Digite seu nome ou apelido" style={styles.headerInput}
                value={senderName}
                onChangeText={text => setSenderName(text)}
              />
            </View>
          </View>

          <View style={styles.content}>
            <View>
              {!isKeyboardVisible ? (
                <>
                  <Text style={styles.subtitle}>Escolha uma refeição abaixo</Text>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    horizontal
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => (
                      <>
                        {(selected && optionIndex == index) ? (
                          <TouchableOpacity
                            style={[styles.selectOptions, { borderWidth: 2, borderColor: '#b73058' }]}
                            onPress={() => {
                              setSelected(false);
                              setOptionIndex(index);
                              setMeal('');
                            }}
                          >
                            <Image source={item.image} style={styles.icons} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity style={styles.selectOptions}
                            onPress={() => {
                              setSelected(true);
                              setOptionIndex(index);
                              setMeal(item.name);
                            }}
                          >
                            <Image source={item.image} style={styles.icons} />
                          </TouchableOpacity>
                        )}

                      </>
                    )}
                  />
                </>
              ) : null}

            </View>

            <View>
              <Text style={styles.subtitle}>Email</Text>
              <TextInput placeholder="Digite o email dele ou dela" style={styles.input}
                value={receiver}
                onChangeText={text => setReceiver(text)}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
            </View>

            <View>
              <Text style={styles.subtitle}>Surpreenda</Text>
              <TextInput placeholder="Solte o verbo para seu/sua amado(a)" style={[styles.input, styles.textarea]}
                underlineColorAndroid="transparent"
                numberOfLines={10}
                multiline={true}
                value={message}
                onChangeText={text => setMessage(text)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.startButton} onPress={() => { sendMail() }} >
                <Text style={styles.buttonTxt} >Enviar Correio</Text>
              </TouchableOpacity>
            </View>


            {!isKeyboardVisible ? (
              <TouchableOpacity onPress={() => navigation.navigate('MailsSent')} style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'Poppins-Light', color: '#8D8D8D80', textAlign: 'center' }} >Veja todas suas cartas enviadas.</Text>
              </TouchableOpacity>
            ) : null}

          </View>
        </LinearGradient>
      </View >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b73058',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  header: {
    width: '100%',
    height: '25%',

    paddingLeft: 20,
    paddingRight: 20,

    alignItems: 'center',
    justifyContent: 'space-around'
  },

  headerTitle: {
    fontSize: 20,
    color: '#fff',

    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Poppins-Medium',
  },

  headerInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',

    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 17,

    fontFamily: 'Poppins-Light',
  },

  content: {
    width: '100%',
    height: '75%',
    backgroundColor: '#fff',

    padding: 20,

    borderTopEndRadius: 30,
    borderTopStartRadius: 30,

    justifyContent: 'center'
  },

  selectOptions: {
    width: 110,
    height: 110,

    borderRadius: 10,
    marginRight: 10,

    backgroundColor: '#f5f5f5',
    overflow: 'hidden',

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icons: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },

  subtitle: {
    fontSize: 22,
    color: '#2f394b',
    fontFamily: 'Poppins-Medium'
  },

  input: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    backgroundColor: '#fff',

    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#b73058',

    marginBottom: 10,
    fontSize: 15,

    fontFamily: 'Poppins-Light',
  },

  textarea: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#b73058',
    padding: 10,

    height: 100,
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },


  // Button
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },

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


export default MessageRegister;