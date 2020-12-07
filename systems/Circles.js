import Matter from "matter-js";
import Circle from '../renderers/Circle';
import { Dimensions } from 'react-native';
import { randomInt } from 'mathjs';

const { width, height } = Dimensions.get("screen");

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
    let score = entities.scoreView.score;
    let circleSize = entities.circleDemon.size[0];
    let radius = entities.circleDemon.size[1];

    if (entities.circleDemon && entities.box) {
      let collision = Matter.SAT.collides(entities.circleDemon.body, entities.box.body);
      if (collision.collided) {
        //delete circle, box and add point
        score++;
        frameCount++;

        //frame delay for box
        if (frameDelayDone()) {
          Matter.Composite.remove(world, entities.box.body);
          delete entities.box;
        }

        //delete circle
        Matter.Composite.remove(world, entities.circleDemon.body);        
        delete entities.circleDemon;        
        
        entities.scoreView.score = score;

        //create new circle
        let circleDemon = Matter.Bodies.circle(randomInt(0, width - 30), height / 3, radius, { 
          density: 0.04, 
          frictionAir: 0.005,
          trajectory: randomInt(-10, 10) / 10,
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

const CircleTrajectory = entities => {
  let xPosDisplay = entities.scoreView.xPos;
  let circleBody = entities.circleDemon.body;
  let circleRadius = entities.circleDemon.size[1];
  
  if (circleBody.position.x > width + circleRadius || circleBody.position.x < 0 - circleRadius) {
    Matter.Body.set(circleBody, {
      trajectory: randomInt(-10, 10) / 10,
    });

    Matter.Body.setPosition(circleBody, {
      x: randomInt(0, width - 30),
      y: 300,
    });
  }

  Matter.Body.setPosition(circleBody, {
    x: circleBody.position.x + circleBody.trajectory,
    y: circleBody.position.y,
  });
  
  entities.scoreView.xPos = circleBody.position.x;
  return entities;
};

export {CircleCollision, CircleTrajectory};