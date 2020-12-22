import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Game from './Game';
import StartScreen from './components/start-screen';
import Login from './components/Login';

import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      {isLoggedIn ? <StartScreen /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </Provider>
  );
}