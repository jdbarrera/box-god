import Matter from "matter-js";
import Circle from '../renderers/Circle';
import { Dimensions } from 'react-native';
import { randomInt } from 'mathjs';
import {randomSide} from '../utils/CircleFunctions';

import store from '../redux/store';
import { getScore } from '../redux/selectors';
import { setScore } from '../redux/actions';

const { width, height } = Dimensions.get("screen");
const state = store.getState();

let frameCount = 0;

const frameDelayDone = () => {
  if (frameCount >= 5) {
    frameCount = 0;
    return true;
  }
  return false;
}

const CircleCollision = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let circleSize = entities.circleDemon.size[0];
    let radius = entities.circleDemon.size[1];
    let {side, trajectory} = randomSide(radius, screen.width);
    let score = state.score;

    if (entities.circleDemon && entities.box) {
      let collision = Matter.SAT.collides(entities.circleDemon.body, entities.box.body);
      if (collision.collided) {
        //add point
        score++;
        store.dispatch(setScore(score));
        frameCount++;

        //delete box
        //Matter.Composite.remove(world, entities.box.body);
        //delete entities.box;

        //mark box
        entities.box.hitCircle = true;

        //delete circle
        Matter.Composite.remove(world, entities.circleDemon.body);        
        delete entities.circleDemon;        
        
        //entities.score.score = score;      

        //create new circle
        let circleDemon = Matter.Bodies.circle(side, height / 3, radius, { 
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

const CircleTrajectory = (entities, {screen}) => {
  let circleBody = entities.circleDemon.body;
  let circleRadius = entities.circleDemon.size[1];
  let {side, trajectory} = randomSide(circleRadius, screen.width);
  
  if (circleBody.position.x > width + circleRadius || circleBody.position.x < 0 - circleRadius) {
    Matter.Body.set(circleBody, {
      trajectory: trajectory,
    });

    Matter.Body.setPosition(circleBody, {
      x: side,
      y: screen.height / 3,
    });
  }

  Matter.Body.setPosition(circleBody, {
    x: circleBody.position.x + circleBody.trajectory,
    y: circleBody.position.y,
  });
  
  return entities;
};

export {CircleCollision, CircleTrajectory};