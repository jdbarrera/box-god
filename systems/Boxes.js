import Matter from "matter-js";
import Box from '../renderers/Box';

let boxIds = 0;
let boxes = {};

const CreateBox = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
    touches.filter(t => t.type === "press").forEach(t => {
            boxes[++boxIds] = Matter.Bodies.rectangle(
                       t.event.pageX, t.event.pageY, 
                       boxSize, boxSize,
                       { 
                         frictionAir: 0.021,
                         restitution: 0.5, 
                        });
            Matter.World.add(world, [boxes[boxIds]]);
            entities[boxIds] = {
                body: boxes[boxIds],
                size: [boxSize, boxSize],
                color: boxIds % 2 == 0 ? "pink" : "#B8E986",
                renderer: Box,
            };
    });
    return entities;
};

const BoxCollision = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    if (entities['3'] && entities['4']) {
      let collision = Matter.SAT.collides(boxes['3'], boxes['4']);
      if (collision.collided) {
        delete entities['3'];
        Matter.Composite.remove(world, boxes['3']);
      }
    }
      
    return entities;
};

export {CreateBox, BoxCollision};