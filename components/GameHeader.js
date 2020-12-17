import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

import ControlCenter from './ControlCenter'
import ScoreView from './ScoreView'

const styles = StyleSheet.create({
  gameHeader: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
  },
});

const GameHeader = (props) => {
    
    return (
      <View style={styles.gameHeader}>
          <ScoreView score={props.score} />
          <ControlCenter 
          startGame={props.startGame} 
          pauseGame={props.pauseGame} />
      </View>
    );
}

GameHeader.propTypes = {
    score: PropTypes.object,
    startGame: PropTypes.func,
    pauseGame: PropTypes.func,
}

export default GameHeader;