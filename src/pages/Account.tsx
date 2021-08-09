import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontContext } from '../contexts/FontContext';

import AppLoading from 'expo-app-loading';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

interface Props {
  navigation: NativeStackNavigationHelpers;
}

function Account({ navigation }: Props) {
  const { fontsLoaded } = useContext(FontContext);

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createAccount() {
    // await 
  }

  useEffect(() => {

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
            <View style={styles.circle}>
              <Image source={require('../../assets/icons/Logo.png')} />
            </View>
          </View>

          <View style={styles.content}>
            {!isLogin ? ( // IS LOGIN === FALSE
              <>
                <Text style={styles.title}>Crie uma conta</Text>

                <View style={styles.form}>
                  <View>
                    <Text style={styles.subtitle}>Email</Text>
                    <TextInput placeholder="Use seu email para criar a conta" style={styles.input} />
                  </View>

                  <View>
                    <Text style={styles.subtitle}>Senha</Text>
                    <TextInput placeholder="Faça uma senha forte :)" style={styles.input} />
                  </View>
                </View>

                <TouchableOpacity style={styles.startButton} onPress={() => {
                  navigation.navigate('Message')
                }} >
                  <Text style={styles.buttonTxt}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionBtn} onPress={() => setIsLogin(true)} >
                  <Text style={styles.optionBtnText}>Já tem uma? Faça login aqui.</Text>
                </TouchableOpacity>
              </>
            ) : ( // IS LOGIN === TRUE
              <>
                <Text style={styles.title}>Acesse sua conta</Text>

                <View style={styles.form}>
                  <View>
                    <Text style={styles.subtitle}>Email</Text>
                    <TextInput placeholder="Use o email criado para acessar sua conta" style={styles.input} />
                  </View>

                  <View>
                    <Text style={styles.subtitle}>Senha</Text>
                    <TextInput placeholder="Coloque a senha da sua conta" style={styles.input} />
                  </View>
                </View>

                <TouchableOpacity style={styles.startButton} onPress={() => {
                  navigation.navigate('Message');
                }} >
                  <Text style={styles.buttonTxt}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionBtn} onPress={() => setIsLogin(false)}>
                  <Text style={styles.optionBtnText}>Não tem uma? Crie uma aqui.</Text>
                </TouchableOpacity>
              </>
            )}
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
  // Button
  startButton: {
    width: '85%',
    height: 60,

    marginTop: 25,
    marginBottom: 10,
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