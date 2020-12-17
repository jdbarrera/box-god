import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions, Button } from 'react-native';
import Constants from 'expo-constants';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";

import Box from '../renderers/Box';
import Circle from '../renderers/Circle';
import CloudLine from '../renderers/CloudLine';

import Physics from '../systems/physics';
import {CreateBox, BoxCollisions} from '../systems/Boxes';
import {CircleCollision, CircleTrajectory} from '../systems/Circles';

import { randomInt } from 'mathjs';

const levelOneEntities = (game) => {
  //get screen dimensions
  const { width, height } = Dimensions.get("screen");
    
  //create boxes
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  //const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

  //create circle
  const circleSize = Math.trunc(Math.max(width, height) * 0.075);
  const radius = circleSize / 2;  
  const circleDemon = Matter.Bodies.circle(0 - radius, height / 3, radius, { 
    density: 0.04, 
    frictionAir: 0.005,
    trajectory: randomInt(20, 30) / 10,
  });

  //create floor
  const floor = Matter.Bodies.rectangle(width / 2, height - boxSize, width * 2, boxSize, { isStatic: true });

  //create platforms
  const platform1 = Matter.Bodies.rectangle(width / 2, height / 1.5, width / 3, boxSize / 2, { isStatic: true });

  //create engine and world
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  //initialize world with entities
  Matter.World.add(world, [circleDemon, floor, platform1]);

  return {
    physics: {
      engine: engine,
      world: world,
      game: game,
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
    cloudLine: {
      size: [width, boxSize / 4],
      yPos: height / 2,
      color: 'blue',
      renderer: CloudLine,
    },
  }
}

export default levelOneEntities;