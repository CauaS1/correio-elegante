import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const imgs = [
  {
    id: 1,
    link: '../../assets/beer.png',
  },
  {
    id: 2,
    link: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    id: 3,

    link: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    link: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];


function MessageRegister() {
  const [selected, setSelected] = useState<boolean>();
  const [optionIndex, setOptionIndex] = useState<number>();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isNameKeyboardVisible, setNameKeyboardVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    console.log(optionIndex);
  }, [optionIndex]);

  return (
    <View>
      <StatusBar translucent={false} backgroundColor="#b73058" />

      <LinearGradient
        colors={['#b73058', '#E06C88']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Você gostaria de se identificar?</Text>
          <TextInput placeholder="Digite seu nome ou apelido" style={styles.headerInput} />
        </View>

        <View style={styles.content}>
          <View>
            {!isKeyboardVisible ? (
              <>
                <Text style={styles.subtitle}>Escolha uma refeição abaixo</Text>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={imgs}
                  horizontal
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item, index }) => (
                    <>
                      {(selected && optionIndex == index)? (
                        <TouchableOpacity
                          style={[styles.selectOptions, { borderWidth: 2, borderColor: '#b73058' }]}
                          onPress={() => {
                            setSelected(false);
                            setOptionIndex(index);
                          }}
                        >
                          <Image source={require('../../assets/beer.png')} style={styles.icons} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={styles.selectOptions}
                          onPress={() => {
                            setSelected(true);
                            setOptionIndex(index);
                          }}
                        >
                          <Image source={require('../../assets/beer.png')} style={styles.icons} />
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
            <TextInput placeholder="Digite o email dele ou dela" style={styles.input} />
          </View>

          <View>
            <Text style={styles.subtitle}>Surpreenda</Text>
            <TextInput placeholder="Solte o verbo para seu/sua amado(a)" style={[styles.input, styles.textarea]}
              underlineColorAndroid="transparent"
              numberOfLines={10}
              multiline={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.buttonTxt}>Enviar Correio</Text>
            </TouchableOpacity>
          </View>

        </View>
      </LinearGradient>
    </View >
  );
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
    justifyContent: 'center'
  },

  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',

    textAlign: 'center',
    marginBottom: 15
  },

  headerInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',

    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 17
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
    fontSize: 25,
    color: '#2f394b',
    fontWeight: 'bold',
    marginBottom: 5
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
    fontSize: 15

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
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff'
  }
})


export default MessageRegister;