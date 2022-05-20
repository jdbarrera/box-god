import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import Box from '../renderers/Box';
import Player from '../renderers/players';
import CloudLine from '../renderers/CloudLine';
import Platform from '../renderers/Platform';

import { randomInt } from 'mathjs';

const levelOneEntities = game => {
    // get screen dimensions
    const { width, height } = Dimensions.get('window');

    // create boxes
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    // create circle
    const playerSize = Math.trunc(Math.max(width, height) * 0.075);
    const player = Matter.Bodies.rectangle(0 - playerSize, height / 2.5, playerSize, playerSize, {
        density: 0.04,
        frictionAir: 0.005,
        trajectory: randomInt(20, 30) / 10
    });

    // create floor
    const floor = Matter.Bodies.rectangle(width / 2, height - boxSize, width * 2, boxSize * 2, { isStatic: true });

    // create platforms
    const platform1 = Matter.Bodies.rectangle(width / 2, height / 1.5, width / 3, boxSize / 2, { isStatic: true });

    // create engine and world
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    // initialize world with entities
    Matter.World.add(world, [player, floor, platform1]);

    return {
        physics: {
            engine: engine,
            world: world,
            game: game
        },
        player: {
            body: player,
            size: [playerSize, playerSize],
            color: 'red',
            renderer: Player
        },
        floor: {
            body: floor,
            size: [width, boxSize * 2],
            color: 'green',
            renderer: Box
        },
        platform1: {
            body: platform1,
            size: [width / 3, boxSize / 2],
            renderer: Platform
        },
        cloudLine: {
            size: [width, boxSize / 4],
            yPos: height / 2.5,
            color: 'blue',
            renderer: CloudLine
        }
    };
};

export default levelOneEntities;