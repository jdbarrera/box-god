import Matter from "matter-js";
import Box from '../renderers/Box';
import MinusOne from '../renderers/MinusOne';
import { Platform } from 'react-native';

let boxIds = 0;

const CreateBoxNative = (entities, { touches, screen }) => { 
  /*if ( Platform.OS === 'ios' || Platform.OS === 'android' ) {

  }*/
  
  if (!entities.box) {
    let cloudLine = entities.cloudLine.yPos
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
    touches.filter(t => t.type === "press").forEach(t => {
            if (t.event.pageY < cloudLine) {
              let box = Matter.Bodies.rectangle(
                        t.event.pageX, t.event.pageY, 
                        boxSize, boxSize,
                        { 
                          frictionAir: 0.021,
                          restitution: 0.5, 
                          });
              Matter.World.add(world, box);
              entities.box = {
                  body: box,
                  size: [boxSize, boxSize],
                  color: boxIds % 2 == 0 ? "pink" : "#B8E986",
                  hitCircle: false,
                  renderer: Box,
              };
            }
    });
  }
  return entities;
  
};

const CreateBoxWeb = (entities, { input, window }) => {
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};

  if (payload) {
    if (!entities.box) {
      let cloudLine = entities.cloudLine.yPos;
      let world = entities["physics"].world;
      let boxSize = Math.trunc(
        Math.max(window.innerWidth, window.innerHeight) * 0.075
      );
      if (payload.pageY < cloudLine) {
        let box = Matter.Bodies.rectangle(
          payload.pageX,
          payload.pageY,
          boxSize,
          boxSize,
          {
            frictionAir: 0.021,
            restitution: 0.5
          }
        );
        Matter.World.add(world, box);
        entities.box = {
          body: box,
          size: [boxSize, boxSize],
          color: boxIds % 2 == 0 ? "pink" : "#B8E986",
          hitCircle: false,
          renderer: Box
        };
      }
    }
  }

  return entities;
};

const BoxCollisions = (entities) => {
  let world = entities["physics"].world;
  let game = entities.physics.game;

  if (entities.floor && entities.box) {
    let collision = Matter.SAT.collides(entities.floor.body, entities.box.body);
    if (collision.collided) {
      if (!entities.box.hitCircle) {
        //subtract point
        game.current.dispatch({type: 'LIFE_LOST'});
        let xPos = entities.box.body.position.x;
        let yPos = entities.box.body.position.y;
        Matter.Composite.remove(world, entities.box.body);
        delete entities.box;

        //MinusOne indication
        entities.minusOne = {
          xPos: xPos,
          yPos: yPos,
          renderer: MinusOne,
        }                
      } 
      else {
        Matter.Composite.remove(world, entities.box.body);
        delete entities.box;
      }   
    }
  } 

  if (entities.platform1 && entities.box) {
    let collision = Matter.SAT.collides(entities.platform1.body, entities.box.body);
    if (collision.collided) {
      if (!entities.box.hitCircle) {
        //subtract point
        game.current.dispatch({type: 'LIFE_LOST'});
        let xPos = entities.box.body.position.x;
        let yPos = entities.box.body.position.y;
        Matter.Composite.remove(world, entities.box.body);
        delete entities.box;

        //MinusOne indication
        entities.minusOne = {
          xPos: xPos,
          yPos: yPos,
          renderer: MinusOne,
        }             
      } 
      else {
        Matter.Composite.remove(world, entities.box.body);
        delete entities.box;
      } 
    }   
  }
      
  return entities;
};

const CreateBox = Platform.OS === 'ios' || Platform.OS === 'android' ? CreateBoxNative : CreateBoxWeb;

export {CreateBox, BoxCollisions};