import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import MessageRegister from './src/pages/MessageRegister';
import Final from './src/pages/FInal';
import { FontProvider } from './src/contexts/FontContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <FontProvider>
        <Stack.Navigator initialRouteName="Final" >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Message" component={MessageRegister} options={{ headerShown: false }} />
          <Stack.Screen name="Final" component={Final} options={{ headerShown: false }} />
        </Stack.Navigator>
      </FontProvider>
    </NavigationContainer>
  );
}

export default App;
