import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions, Button } from 'react-native';
import Constants from 'expo-constants';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import ControlCenter from './components/ControlCenter';
import ScoreView from './components/ScoreView'

import levelOneEntities from './Levels/LevelOne';

import Physics from './systems/physics';
import {CreateBox, BoxCollisions} from './systems/Boxes';
import {CircleCollision, CircleTrajectory} from './systems/Circles';

import { connect } from 'react-redux';
import { getScore } from './redux/selectors';
import { setScore } from './redux/actions';

import { randomInt } from 'mathjs';

const Game = ( props ) => {
  const levelOne = levelOneEntities();
  const [isRunning, setIsRunning] = useState(true);
  
  const pauseGame = () => {
    setIsRunning(false);
  }

  const startGame = () => {
    setIsRunning(true);
  }

  return (
    <GameEngine 
    style={styles.container}
    systems={[Physics, CreateBox, BoxCollisions, CircleCollision, CircleTrajectory]}
    entities={levelOne}
    running={isRunning}
    >
      <ScoreView score={props.score} />
      <ControlCenter 
      pauseGame={pauseGame} 
      startGame={startGame} />
      <StatusBar />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Constants.statusBarHeight,
  },
});

const mapStateToProps = state => ({
  score: getScore(state),
})

export default connect(mapStateToProps, { setScore })(Game);