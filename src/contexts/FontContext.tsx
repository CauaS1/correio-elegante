import React, { useEffect, useState } from "react";
import { ReactNode, createContext } from "react";
import * as Font from 'expo-font';

interface Props {
  children: ReactNode;
}

interface FontContextData {
  fontsLoaded: boolean,
}

export const FontContext = createContext({} as FontContextData);

export function FontProvider({ children }: Props) {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  async function getFonts() {
    await Font.loadAsync({
      'Courgette-Regular': require('../../assets/fonts/Courgette-Regular.ttf'),
      'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    });
    setFontsLoaded(true);
  }
  
  useEffect(() => {
    getFonts();
  }, []);

  return (
    <FontContext.Provider value={{
      fontsLoaded
    }}>
      { children }
    </FontContext.Provider>
  );
} 