import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Game from './Game';
import GameControl from './start-screen';

export default function App() {
  return (
    <GameControl />
  );
}
