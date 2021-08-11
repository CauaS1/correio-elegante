import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, TextInput, Keyboard, Dimensions } from 'react-native';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { api } from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { FontContext } from '../contexts/FontContext';

import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";



interface Props {
  navigation: NativeStackNavigationHelpers;
}

interface IUser {
  token: string;
  user: {
    email: string;
  }
}

function Account({ navigation }: Props) {
  const { fontsLoaded } = useContext(FontContext);

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const screenHeight = Dimensions.get('window').height;

  async function createAccount() {
    try {
      await api.post('/register', {
        email: email,
        password: password
      });

      setIsLogin(true);
      setPassword('');
    } catch (err) {
      console.log(err);
    }
  }

  async function accountLogin() {
    try {
      const user = await api.post('/login', {
        email: email,
        password: password
      });

      const userData: IUser = user.data;

      await AsyncStorage.setItem('user_token', userData.token);
      await AsyncStorage.setItem('user_email', userData.user.email);

      setPassword('');
      setEmail('');
      navigation.navigate('Message');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

  }, []);

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
            {!isKeyboardVisible ? (
              <>
                {screenHeight > 640 ? (
                  <View style={styles.circle}>
                    <Image source={require('../../assets/icons/Logo.png')} />
                  </View>
                ) : (
                  <View style={smallStyles.circle}>
                    <Image source={require('../../assets/icons/Logo.png')} />
                  </View>
                )}
              </>
            ) : null}
          </View>

          <View style={styles.content}>
            {isLogin ? ( // IS LOGIN === FALSE
              <>
                {!isKeyboardVisible ? (
                  <>
                    {screenHeight > 640 ? (
                      <Text style={styles.title}>Crie uma conta</Text>
                    ) : (
                      <Text style={smallStyles.title}>Crie uma conta</Text>
                    )}
                  </>
                ) : null}

                <View style={styles.form}>
                  <View>
                    {screenHeight > 640 ? (
                      <>

                        <Text style={styles.subtitle}>Email</Text>
                        <TextInput placeholder="Use um email para criar a sua conta" style={styles.input}
                          value={email}
                          onChangeText={text => setEmail(text)}
                          autoCapitalize={'none'}
                        />
                      </>

                    ) : (
                      <>

                        <Text style={smallStyles.subtitle}>Email</Text>
                        <TextInput placeholder="Use um email para criar a sua conta" style={smallStyles.input}
                          value={email}
                          onChangeText={text => setEmail(text)}
                          autoCapitalize={'none'}
                        />
                      </>
                    )}

                  </View>

                  <View>
                    {screenHeight > 640 ? (
                      <>
                        <Text style={styles.subtitle}>Senha</Text>
                        <TextInput placeholder="Faça uma senha forte" style={styles.input}
                          value={password}
                          onChangeText={text => setPassword(text)}
                          secureTextEntry={true}
                        />
                      </>
                    ) : (
                      <>
                        <Text style={smallStyles.subtitle}>Senha</Text>
                        <TextInput placeholder="Faça uma senha forte" style={smallStyles.input}
                          value={password}
                          onChangeText={text => setPassword(text)}
                          secureTextEntry={true}
                        />
                      </>

                    )}
                  </View>
                </View>

                {screenHeight > 640 ? (
                  <TouchableOpacity style={styles.startButton} onPress={() => {
                    createAccount();
                  }} >
                    <Text style={styles.buttonTxt}>Registrar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={smallStyles.startButton} onPress={() => {
                    createAccount();
                  }} >
                    <Text style={styles.buttonTxt}>Registrar</Text>
                  </TouchableOpacity>
                )}

                {!isKeyboardVisible ? (
                  <>
                    {screenHeight > 640 ? (
                      <TouchableOpacity style={styles.optionBtn} onPress={() => setIsLogin(false)} >
                        <Text style={styles.optionBtnText}>Já tem uma? Faça login aqui.</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={smallStyles.optionBtn} onPress={() => setIsLogin(false)} >
                        <Text style={styles.optionBtnText}>Já tem uma? Faça login aqui.</Text>
                      </TouchableOpacity>
                    )}

                  </>
                ) : null}
              </>
            ) : ( // IS LOGIN === TRUE
              <>
                {!isKeyboardVisible ? (
                  <>
                    {screenHeight > 640 ? (
                      <Text style={styles.title}>Acesse sua conta</Text>
                    ) : (
                      <Text style={smallStyles.title}>Acesse sua conta</Text>
                    )}
                  </>
                ) : null}

                <View style={styles.form}>
                  <View>
                    {screenHeight > 640 ? (
                      <>

                        <Text style={styles.subtitle}>Email</Text>
                        <TextInput placeholder="Use o email criado para acessar sua conta" style={styles.input}
                          value={email}
                          onChangeText={text => setEmail(text)}
                          autoCapitalize={'none'}
                        />
                      </>

                    ) : (
                      <>

                        <Text style={smallStyles.subtitle}>Email</Text>
                        <TextInput placeholder="Use o email criado para acessar sua conta" style={smallStyles.input}
                          value={email}
                          onChangeText={text => setEmail(text)}
                          autoCapitalize={'none'}
                        />
                      </>
                    )}

                  </View>

                  <View>
                    {screenHeight > 640 ? (
                      <>
                        <Text style={styles.subtitle}>Senha</Text>
                        <TextInput placeholder="Coloque a senha da sua conta" style={styles.input}
                          value={password}
                          onChangeText={text => setPassword(text)}
                          secureTextEntry={true}
                        />
                      </>
                    ) : (
                      <>
                        <Text style={smallStyles.subtitle}>Senha</Text>
                        <TextInput placeholder="Coloque a senha da sua conta" style={smallStyles.input}
                          value={password}
                          onChangeText={text => setPassword(text)}
                          secureTextEntry={true}
                        />
                      </>

                    )}
                  </View>
                </View>

                {screenHeight > 640 ? (
                  <TouchableOpacity style={styles.startButton} onPress={() => {
                    accountLogin()
                  }} >
                    <Text style={styles.buttonTxt}>Entrar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={smallStyles.startButton} onPress={() => {
                    accountLogin()
                  }} >
                    <Text style={styles.buttonTxt}>Entrar</Text>
                  </TouchableOpacity>
                )}

                {!isKeyboardVisible ? (
                  <>
                    {screenHeight > 640 ? (
                      <TouchableOpacity style={styles.optionBtn} onPress={() => setIsLogin(true)}>
                        <Text style={styles.optionBtnText}>Não tem uma? Crie uma aqui.</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={smallStyles.optionBtn} onPress={() => setIsLogin(true)}>
                        <Text style={styles.optionBtnText}>Não tem uma? Crie uma aqui.</Text>
                      </TouchableOpacity>
                    )}

                  </>
                ) : null}

              </>
            )}
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
    justifyContent: 'space-between'
  },

  /* Top Circle */
  imageContent: {
    width: '100%',
    height: '40%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: '65%',
    height: '80%',
    backgroundColor: '#fff',

    borderRadius: 200,

    alignItems: 'center',
    justifyContent: 'center'
  },

  /* Bottom content */
  content: {
    width: '100%',
    height: '60%',
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


  /*  F O R M */
  form: {
    width: '100%',
  },


  subtitle: {
    fontSize: 22,
    color: '#2f394b',
    fontFamily: 'Poppins-Medium'
  },

  input: {
    width: '100%',
    height: 55,
    paddingLeft: 10,
    backgroundColor: '#fff',

    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#b73058',

    marginBottom: 10,
    fontSize: 15,

    fontFamily: 'Poppins-Light',
  },
  // Button
  startButton: {
    width: '85%',
    height: 60,

    marginTop: 25,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E06C88'
  },
  buttonTxt: {
    fontSize: 28,
    color: '#fff',

    fontFamily: 'Courgette-Regular',
  },

  optionBtn: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 30
  },
  optionBtnText: {
    color: '#9cabc2',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },

})

const smallStyles = StyleSheet.create({
  /* Top Circle */
  circle: {
    width: '65%',
    height: '70%',
    backgroundColor: '#fff',

    borderRadius: 200,

    alignItems: 'center',
    justifyContent: 'center'
  },

  /* Bottom content */
  title: {
    fontSize: 30,
    color: '#2f394b',
    textAlign: 'center',

    fontFamily: 'Poppins-Medium',
  },

  /*  F O R M */
  form: {
    width: '100%',
  },

  subtitle: {
    fontSize: 18,
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
    fontSize: 13,

    fontFamily: 'Poppins-Light',
  },
  // Button
  startButton: {
    width: '85%',
    height: 50,

    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E06C88'
  },
  buttonTxt: {
    fontSize: 20,
    color: '#fff',

    fontFamily: 'Courgette-Regular',
  },

  optionBtn: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 18
  },
  optionBtnText: {
    color: '#9cabc2',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },

})

export default Account;

// Rosa Escuro: #B73058
// Rosa Claro: #E06C88
// Cinza: #8D8D8D
// Cinza Escuro: #2F394B
// Cinza Claro: #9CABC2
// Para as fontes: #E7DFDD