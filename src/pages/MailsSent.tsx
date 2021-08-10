import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface IMail {
  sender: string;
  receiver: string;
  meal: string;
  message: string;
  id: string;
}

function MailsSent() {
  const [mails, setMails] = useState<IMail[]>([])

  async function getMyMails() {
    const userId = await AsyncStorage.getItem('user_id');
    try {
      const mail = await (await api.get('/mail/' + userId)).data;
      setMails(mail);

    } catch (err) {
      console.log(err);
    }
  }

  function selectImage() {
    for (let mail of mails) {
      switch (mail.meal) {
        case 'lollipop':
          return <Image source={require('../../assets/icons/lollipop.png')} style={styles.icon} />
        case 'beer':
          return <Image source={require('../../assets/icons/beer.png')} style={styles.icon} />
        case 'champagne':
          return <Image source={require('../../assets/icons/champagne.png')} style={styles.icon} />
        case 'fast-food':
          return <Image source={require('../../assets/icons/fast-food.png')} style={styles.icon} />
        case 'cheese':
          return <Image source={require('../../assets/icons/cheese.png')} style={styles.icon} />
        case 'french-fries':
          return <Image source={require('../../assets/icons/french-fries.png')} style={styles.icon} />
        case 'wine':
          return <Image source={require('../../assets/icons/wine.png')} style={styles.icon} />
      }
    }
  }

  useEffect(() => {
    getMyMails();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#b73058" barStyle="light-content" />

      <LinearGradient
        colors={['#b73058', '#E06C88']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Todas suas cartas enviadas</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Surpreenda seu amor</Text>

          <FlatList
            data={mails}
            renderItem={({ item, }) => (
              <View style={styles.mail}>
                <View style={styles.imgContainer}>
                  {selectImage()}
                </View>

                <View style={styles.info}>
                  <Text style={styles.receiverTitle}>Para: {item.receiver}</Text>
                  <Text style={styles.senderTitle}>De: {item.sender}</Text>
                  <Text style={styles.messageStyle}
                    numberOfLines={2}
                  >{item.message}</Text>
                </View>
              </View>
            )}
          />


        </View>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b73058',

    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  header: {
    width: '100%',
    height: '20%',

    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  },

  content: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',

    padding: 10,

    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },

  mail: {
    width: '100%',
    height: 110,

    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 10,
    paddingRight: 10,

    overflow: 'hidden',
    marginBottom: 10
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  imgContainer: {
    width: 110,
    height: 110,

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  /* INFO*/
  info: {
    width: '73%',
    height: '100%',
    paddingLeft: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  receiverTitle: {
    fontSize: 19,
    color: '#2f394b',

    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  senderTitle: {
    fontFamily: 'Poppins-Light',
    color: '#2f394b'
  },
  messageStyle: {
    fontFamily: 'Poppins-ExtraLight',
    color: '#2f394b',
    fontSize: 13,
  }
});

export default MailsSent;