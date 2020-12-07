import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from './renderers/Box';
import Circle from './renderers/Circle';
import ScoreView from './renderers/ScoreView'
import Physics from './systems/physics';
import {CreateBox, BoxCollisions} from './systems/Boxes';
import {CircleCollision, CircleTrajectory} from './systems/Circles';
import { randomInt } from 'mathjs';

  const getEntities = () => {//get screen dimensions
    const { width, height } = Dimensions.get("screen");
    
    //create boxes
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);
    //const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

    //create circle
    const circleSize = Math.trunc(Math.max(width, height) * 0.075);
    const radius = circleSize / 2;  
    const circleDemon = Matter.Bodies.circle(width / 2, height / 3, radius, { 
      density: 0.04, 
      frictionAir: 0.005,
      trajectory: randomInt(-10, 10) / 10,
    });

    //create floor
    const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });

    //create platforms
    const platform1 = Matter.Bodies.rectangle(width / 2, height / 2, width / 3, boxSize / 2, { isStatic: true });

    //create engine and world
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    //initialize world with entities
    Matter.World.add(world, [circleDemon, floor, platform1]);

    return {
      physics: {
        engine: engine,
        world: world,
      },
      circleDemon: { 
        body: circleDemon, 
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
      platform1: {
        body: platform1,
        size: [width / 3, boxSize / 2],
        color: "red",
        renderer: Box,
      },
      scoreView: {
        score: 0,
        xPos: circleDemon.position.x,
        renderer: ScoreView,
      }
    }
}

const Game = () => {
  const entities = getEntities();

  return (
    <GameEngine 
    style={styles.container}
    systems={[Physics, CreateBox, BoxCollisions, CircleCollision, CircleTrajectory]}
    entities={entities}>
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