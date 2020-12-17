import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Game from './Game';
import GameControl from './start-screen';

import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <GameControl />
    </Provider>
  );
}