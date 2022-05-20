import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import GameEngine from "./utils/GameEngineExport";
import GameHeader from './components/GameHeader';
import EndGame from './components/EndGame';
import levelOneEntities from './levels/LevelOne';
import Physics from './systems/physics';
import { CreateBall, BallCollisions } from './systems/Ball';
import { PlayerCollision, PlayerTrajectory } from './systems/Player';
import {MoveHitIndicators} from './systems/hitIndicators';
import { connect } from 'react-redux';
import { getScore } from './redux/selectors';
import { setPoints, setLives } from './redux/actions';

const backgroundImage = require('./assets/baseballBackground.png');
const { width, height } = Dimensions.get("window");

const Game = props => {
  const [isRunning, setIsRunning] = useState(true);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);
  const game = useRef(null);

  const pauseGame = () => {
      setIsRunning(false);
  };

  const startGame = () => {
      setIsRunning(true);
  };

  const getEntities = (level, game) => {
      return levelOneEntities(game);
  };

  const restart = () => {
      setLives(3);
      setPoints(0);
      game.current.swap(getEntities(1, game));
  };

  const returnToHome = () => {
      restart();
      props.returnHome();
  };

  const onEvent = e => {
      switch (e.type) {
          case 'ADD_POINT':
              setPoints(points + 1);
              break;
          case 'LIFE_LOST':
              setLives(lives - 1);
              break;
      }
  };

  return (
      <View style={styles.gameContainer}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
              <GameEngine
                  style={styles.game}
                  systems={[
                      Physics,
                      CreateBall,
                      BallCollisions,
                      PlayerCollision,
                      PlayerTrajectory,
                      MoveHitIndicators
                  ]}
                  ref={game}
                  entities={getEntities(1, game)}
                  running={isRunning}
                  onEvent={onEvent}
              >
                  {lives <= 0 && <EndGame restart={restart} currentScore={points} returnToHome={returnToHome} />}
                  <GameHeader
                      points={points}
                      lives={lives}
                      startGame={startGame}
                      pauseGame={pauseGame}
                      isRunning={isRunning}
                      returnHome={returnToHome}
                  />
                  <StatusBar />
              </GameEngine>
          </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    width: width,
    maxWidth: 480,
    backgroundColor: '#ffffff',
    paddingTop: Constants.statusBarHeight,
    overflow: 'hidden',    
  },
  game: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Constants.statusBarHeight,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const mapStateToProps = state => ({
  score: getScore(state),
});

export default connect(mapStateToProps, { setPoints, setLives })(Game);