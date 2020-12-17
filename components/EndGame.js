import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

import ControlCenter from './ControlCenter'
import ScoreView from './ScoreView'

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.5,
    position: 'absolute',
    top: Constants.statusBarHeight,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  endGameText: {
    color: '#ffffff',
    fontSize: 24,
    paddingTop: 40,
  },
  highScoreText: {
    color: '#ffffff',
    fontSize: 24,
    paddingBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

const EndGame = (props) => {
    
    return (
      <View style={styles.overlay}>
          <Text style={styles.endGameText}>Game Over</Text>
          <Text style={styles.highScoreText}>High Score: {props.highScore}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={props.restart}
          >
            <Text>Restart</Text>
          </TouchableOpacity>
      </View>
    );
}

EndGame.propTypes = {
    score: PropTypes.number,
    restart: PropTypes.func,
}

export default EndGame;