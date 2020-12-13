import { randomInt } from 'mathjs';

const randomSide = (circleRadius, width) => {
  let num = randomInt(0, 10);
  const left = 0 - circleRadius;
  const right = width + circleRadius;

  if (num % 2 == 0) {
    return {
      side: left,
      trajectory: randomInt(30, 40) / 10,
    }
  } else {
    return {
      side: right,
      trajectory: (randomInt(30, 40) / 10) * -1,
    }
  }
}

export {randomSide};