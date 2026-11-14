import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import {
  authenticateUser,
  registerUser as registerUserInDb,
} from '../service/DatabaseService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const persistSession = async (nextUser) => {
    await Keychain.setGenericPassword(nextUser.username, 'session');
    setUser(nextUser);
    return nextUser;
  };

  const login = async (username, password) => {
    const matchedUser = await authenticateUser(username, password);
    if (!matchedUser) {
      throw new Error('Invalid username or password');
    }
    return persistSession(matchedUser);
  };

  const register = async (username, password) => {
    const createdUser = await registerUserInDb(username, password);
    return persistSession(createdUser);
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      setUser(null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
