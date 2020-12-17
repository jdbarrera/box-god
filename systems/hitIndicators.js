import Matter from "matter-js";
import Box from '../renderers/Box';

let boxIds = 0;

const MoveHitIndicators = (entities, { touches, screen }) => { 
  
  if (entities.plusOne) {
    let newYPos = entities.plusOne.yPos - 1;
    entities.plusOne.yPos = newYPos;
  }
  if (entities.minusOne) {
    let newYPos = entities.minusOne.yPos - 1;
    entities.minusOne.yPos = newYPos;
  }

  return entities;
  
};

export {MoveHitIndicators};