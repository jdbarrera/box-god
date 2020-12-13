import Matter from "matter-js";
import Box from '../renderers/Box';

let boxIds = 0;

const CreateBox = (entities, { touches, screen }) => {
    if (!entities.box) {
      let world = entities["physics"].world;
      let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
      touches.filter(t => t.type === "press").forEach(t => {
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
      });
    }
    return entities;
};

const BoxCollisions = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    //let score = entities.score.score;

    if (entities.floor && entities.box) {
      let collision = Matter.SAT.collides(entities.floor.body, entities.box.body);
      if (collision.collided) {
        if (!entities.box.hitCircle) {
          //delete box and subtract point
          //score--;
          Matter.Composite.remove(world, entities.box.body);
          delete entities.box;
          //entities.score.score = score;                   
        } else {
          Matter.Composite.remove(world, entities.box.body);
          delete entities.box;
        }   
      }
    } 

    if (entities.platform1 && entities.box) {
      let collision = Matter.SAT.collides(entities.platform1.body, entities.box.body);
      if (collision.collided) {
        if (!entities.box.hitCircle) {
          //delete box and subtract point
          //score--;
          Matter.Composite.remove(world, entities.box.body);
          delete entities.box;
          //entities.score.score = score;               
        } else {
          Matter.Composite.remove(world, entities.box.body);
          delete entities.box;
        } 
      }   
    }
      
    return entities;
};

export {CreateBox, BoxCollisions};