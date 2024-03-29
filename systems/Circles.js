import Matter from "matter-js";
import Circle from '../renderers/Circle';
import { Platform, Dimensions } from 'react-native';
import { randomInt } from 'mathjs';
import {randomSide} from '../utils/CircleFunctions';
import PlusOne from '../renderers/PlusOne';

const CircleCollisionNative = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let game = entities.physics.game;
    let circleSize = entities.circleDemon.size[0];
    let radius = entities.circleDemon.size[1];
    let {side, trajectory} = randomSide(radius, screen.width);

    if (entities.circleDemon && entities.box) {
      let collision = Matter.SAT.collides(entities.circleDemon.body, entities.box.body);
      if (collision.collided) {
        //add point
        game.current.dispatch({type: 'ADD_POINT'});

        //mark box
        entities.box.hitCircle = true;

        //delete circle
        let xPos = entities.circleDemon.body.position.x;
        let yPos = entities.circleDemon.body.position.y;
        Matter.Composite.remove(world, entities.circleDemon.body);        
        delete entities.circleDemon;

        //PlusOne indication
        entities.plusOne = {
          xPos: xPos,
          yPos: yPos,
          renderer: PlusOne,
        }

        //create new circle
        let circleDemon = Matter.Bodies.circle(side, screen.height / 2.5, radius, { 
          density: 0.04, 
          frictionAir: 0.005,
          trajectory: trajectory,
        });

        Matter.World.add(world, circleDemon);
        entities.circleDemon = {
          body: circleDemon, 
          size: [circleSize, radius], 
          color: 'red', 
          renderer: Circle,
        }
      }   
    } 
      
    return entities;
};

const CircleCollisionWeb = (entities, {window}) => {
    let world = entities["physics"].world;
    let game = entities.physics.game;
    let circleSize = entities.circleDemon.size[0];
    let radius = entities.circleDemon.size[1];
    let {side, trajectory} = randomSide(radius, window.innerWidth);

    if (entities.circleDemon && entities.box) {
      let collision = Matter.SAT.collides(entities.circleDemon.body, entities.box.body);      
      if (collision.collided) {
        //add point
        game.current.dispatch({type: 'ADD_POINT'});

        //mark box
        entities.box.hitCircle = true;
        
        //delete circle
        let xPos = entities.circleDemon.body.position.x;
        let yPos = entities.circleDemon.body.position.y;
        Matter.Composite.remove(world, entities.circleDemon.body);        
        delete entities.circleDemon;

        //PlusOne indication
        entities.plusOne = {
          xPos: xPos,
          yPos: yPos,
          renderer: PlusOne,
        }

        //create new circle
        let circleDemon = Matter.Bodies.circle(side, window.innerHeight / 2.5, radius, { 
          density: 0.04, 
          frictionAir: 0.005,
          trajectory: trajectory,
        });

        Matter.World.add(world, circleDemon);
        entities.circleDemon = {
          body: circleDemon, 
          size: [circleSize, radius], 
          color: 'red', 
          renderer: Circle,
        }
      }   
    } 
      
    return entities;
};

const CircleTrajectoryNative = (entities, {screen}) => {
  let circleBody = entities.circleDemon.body;
  let circleRadius = entities.circleDemon.size[1];
  let {side, trajectory} = randomSide(circleRadius, screen.width);
  
  if (circleBody.position.x > screen.width + circleRadius || circleBody.position.x < 0 - circleRadius) {
    Matter.Body.set(circleBody, {
      trajectory: trajectory,
    });

    Matter.Body.setPosition(circleBody, {
      x: side,
      y: screen.height / 2.5,
    });
  }

  Matter.Body.setPosition(circleBody, {
    x: circleBody.position.x + circleBody.trajectory,
    y: circleBody.position.y,
  });
  
  return entities;
};

const CircleTrajectoryWeb = (entities, {window}) => {
  let circleBody = entities.circleDemon.body;
  let circleRadius = entities.circleDemon.size[1];
  let {side, trajectory} = randomSide(circleRadius, window.innerWidth);
  
  if (circleBody.position.x > window.innerWidth + circleRadius || circleBody.position.x < 0 - circleRadius) {
    Matter.Body.set(circleBody, {
      trajectory: trajectory,
    });

    Matter.Body.setPosition(circleBody, {
      x: side,
      y: window.innerHeight / 2.5,
    });
  }

  Matter.Body.setPosition(circleBody, {
    x: circleBody.position.x + circleBody.trajectory,
    y: circleBody.position.y,
  });
  
  return entities;
};

const CircleCollision = Platform.OS === 'ios' || Platform.OS === 'android' ? CircleCollisionNative : CircleCollisionWeb;
const CircleTrajectory = Platform.OS === 'ios' || Platform.OS === 'android' ? CircleTrajectoryNative : CircleTrajectoryWeb;

export {CircleCollision, CircleTrajectory};