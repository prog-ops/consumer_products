import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const predefinedUsername = 'U';
  const predefinedPassword = 'P';

  const login = async (username, password) => {
    if (username === predefinedUsername && password === predefinedPassword) {
      try {
        await Keychain.setGenericPassword(username, password);
        setUser({ username });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Invalid username or password');
    }
  };

  const loginNotPredefined = async (username, password) => {
    try {
      await Keychain.setGenericPassword(username, password);
      setUser({ username });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
