import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from './renderers/Box';
import Physics from './systems/physics';
import {CreateBox, BoxCollision} from './systems/Boxes';

const Game = () => {
  //get screen dimensions
  const { width, height } = Dimensions.get("screen");
  
  //create boxes
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

  //create floor
  const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });

  //create engine and world
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  //initialize world with entities
  Matter.World.add(world, [initialBox, floor]);

  return (
    <GameEngine 
    style={styles.container}
    systems={[Physics, CreateBox, BoxCollision]}
    entities={{ 
      physics: {
        engine: engine,
        world: world,
      },
      initialBox: { 
        body: initialBox, 
        size: [boxSize, boxSize], 
        color: 'red', 
        renderer: Box,
      },
      floor: { 
        body: floor, 
        size: [width, boxSize], 
        color: "green", 
        renderer: Box, 
      },
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