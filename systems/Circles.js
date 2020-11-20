import Matter from "matter-js";
import Circle from '../renderers/Circle';
import { Dimensions } from 'react-native';
import { randomInt } from 'mathjs'

const { width, height } = Dimensions.get("screen");

const CircleCollision = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let score = entities.scoreView.score;

    if (entities.initialCircle && entities.box1) {
      let collision = Matter.SAT.collides(entities.initialCircle.body, entities.box1.body);
      if (collision.collided) {
        score++;        
        Matter.Composite.remove(world, entities.initialCircle.body);
        delete entities.initialCircle;
        entities.scoreView.score = score;
      }   
    } 
      
    return entities;
};

const CircleTrajectory = entities => {
  let xPosDisplay = entities.scoreView.xPos;
  let circleBody = entities.initialCircle.body;
  
  if (circleBody.position.x > width || circleBody.position.x < 0) {
    Matter.Body.set(circleBody, {
      trajectory: randomInt(-5, 5) / 10,
    });
    Matter.Body.setPosition(circleBody, {
      x: randomInt(0, width - 30),
      y: 300,
    });
  }

  Matter.Body.setPosition(circleBody, {
    x: circleBody.position.x + 1,
    y: circleBody.position.y,
  });
  
  entities.scoreView.xPos = entities.initialCircle.body.position.x;
  return entities;
};

export {CircleCollision, CircleTrajectory};