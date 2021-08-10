import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import MessageRegister from './src/pages/MessageRegister';
import Final from './src/pages/Final';
import { FontProvider } from './src/contexts/FontContext';
import Account from './src/pages/Account';
import { VerifyProvider } from './src/contexts/VerifyContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <VerifyProvider>
        <FontProvider>
          <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Message" component={MessageRegister} options={{ headerShown: false }} />
            <Stack.Screen name="Final" component={Final} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />

          </Stack.Navigator>
        </FontProvider>
      </VerifyProvider>
    </NavigationContainer>
  );
}

export default App;
