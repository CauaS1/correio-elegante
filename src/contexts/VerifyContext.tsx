import React, {ReactNode, createContext } from "react";
import { api } from "../services/api";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";

import AsyncStorage from "@react-native-async-storage/async-storage";


interface Props {
  children: ReactNode;
}

interface VerifyContextData {
  verifyUserToken: () => void;
}

export const VerifyContext = createContext({} as VerifyContextData);

export function VerifyProvider({ children }: Props) {

  async function verifyUserToken() {
    const token = await AsyncStorage.getItem('user_token');

    try {
      await api.get('/verify', {
        headers: {
          'authorization': token
        }
      });

    } catch (err) {
      console.log(err);
      await AsyncStorage.setItem('user_token', '');
    }
  }

  return (
    <VerifyContext.Provider value={{
      verifyUserToken
    }}>
      {children}
    </VerifyContext.Provider>
  );
}