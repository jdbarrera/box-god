import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from './renderers/Box';
import Circle from './renderers/Circle';
import ScoreView from './renderers/ScoreView'
import Physics from './systems/physics';
import {CreateBox} from './systems/Boxes';
import {CircleCollision, CircleTrajectory} from './systems/Circles';

const Game = () => {
  //start score
  let score = 0;

  //get screen dimensions
  const { width, height } = Dimensions.get("screen");
  
  //create boxes
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  //const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

  //create circle
  const circleSize = Math.trunc(Math.max(width, height) * 0.075);
  const radius = circleSize / 2;  
  const initialCircle = Matter.Bodies.circle(width / 2, height / 2, radius, { density: 0.04, frictionAir: 0.005});

  //create floor
  const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });

  //create engine and world
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  //initialize world with entities
  Matter.World.add(world, [initialCircle, floor]);

  return (
    <GameEngine 
    style={styles.container}
    systems={[Physics, CreateBox, CircleCollision, CircleTrajectory]}
    entities={{ 
      physics: {
        engine: engine,
        world: world,
      },
      initialCircle: { 
        body: initialCircle, 
        size: [circleSize, radius], 
        color: 'red', 
        renderer: Circle,
      },
      floor: { 
        body: floor, 
        size: [width, boxSize], 
        color: "green", 
        renderer: Box, 
      },
      scoreView: {
        score: score,
        xPos: initialCircle.position.x,
        renderer: ScoreView,
      }
    }}>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Game;