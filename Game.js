import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import GameEngine from "./utils/GameEngineExport";
import GameHeader from './components/GameHeader';
import EndGame from './components/EndGame';
import levelOneEntities from './levels/LevelOne';
import Physics from './systems/physics';
import {CreateBox, BoxCollisions} from './systems/Boxes';
import {CircleCollision, CircleTrajectory} from './systems/Circles';
import {MoveHitIndicators} from './systems/hitIndicators';
import { connect } from 'react-redux';
import { getScore } from './redux/selectors';
import { setPoints, setLives } from './redux/actions';

const backgroundImage = require('./assets/Full-background.png');
const { width, height } = Dimensions.get("window");

const Game = ( props ) => {
  const [isRunning, setIsRunning] = useState(true);
  const game = useRef(null);
  
  const pauseGame = () => {
    setIsRunning(false);
  };

  const startGame = () => {
    setIsRunning(true);
  };

  const restart = () => {
    props.setLives(3);
    props.setPoints(0);
    game.current.swap(getEntities(1, game));
  };

  const returnToHome = () => {
    restart();
    props.returnHome();
  };

  const onEvent = (e) => {
    switch(e.type) {
      case 'ADD_POINT':
        props.setPoints(props.score.points + 1);
        break;
      case 'LIFE_LOST':
        props.setLives(props.score.lives - 1);
        break;
    }    
  }

  const getEntities = (level, game) => {
    return levelOneEntities(game);
  }

  return (
      <View style={styles.gameContainer}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <GameEngine 
          style={styles.game}
          systems={[
            Physics, 
            CreateBox, 
            BoxCollisions, 
            CircleCollision, 
            CircleTrajectory,
            MoveHitIndicators
            ]}
          ref={game}
          entities={getEntities(1, game)}
          running={isRunning}
          onEvent={onEvent}
          >
          {props.score.lives <= 0 && 
            <EndGame 
              restart={restart} 
              currentScore={props.score.points} 
              returnToHome={returnToHome} />}
            <GameHeader 
              score={props.score}
              startGame={startGame}
              pauseGame={pauseGame}
              isRunning={isRunning} 
              returnHome={returnToHome}/>        
            <StatusBar />      
          </GameEngine>
        </ImageBackground>  
      </View>
  );
}

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