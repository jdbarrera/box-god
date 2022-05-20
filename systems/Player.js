import Matter from 'matter-js';
import Player from '../renderers/players';
import { randomSide } from '../utils/CircleFunctions';
import PlusOne from '../renderers/PlusOne';
import { Platform } from 'react-native';

const PlayerCollisionNative = (entities, { screen }) => {
    const world = entities.physics.world;
    const game = entities.physics.game;
    const playerSize = entities.player.size[0];
    const { side, trajectory } = randomSide(playerSize, screen.width);

    if (entities.player && entities.ball) {
        const collision = Matter.SAT.collides(entities.player.body, entities.ball.body);
        if (collision.collided) {
            // add point
            game.current.dispatch({ type: 'ADD_POINT' });

            // mark box
            entities.ball.hitCircle = true;

            // delete player
            const xPos = entities.player.body.position.x;
            const yPos = entities.player.body.position.y;
            Matter.Composite.remove(world, entities.player.body);
            delete entities.player;

            // PlusOne indication
            entities.plusOne = {
                xPos: xPos,
                yPos: yPos,
                renderer: PlusOne
            };

            // create new player
            const player = Matter.Bodies.rectangle(side, screen.height / 2.5, playerSize, playerSize, {
                density: 0.04,
                frictionAir: 0.005,
                trajectory: trajectory
            });

            Matter.World.add(world, player);
            entities.player = {
                body: player,
                size: [playerSize, playerSize],
                color: 'red',
                renderer: Player
            };
        }
    }

    return entities;
};

const PlayerCollisionWeb = (entities, {window}) => {
    let world = entities["physics"].world;
    let game = entities.physics.game;
    let playerSize = entities.player.size[0];
    let {side, trajectory} = randomSide(playerSize, window.innerWidth);

    if (entities.player && entities.ball) {
      let collision = Matter.SAT.collides(entities.player.body, entities.ball.body);      
      if (collision.collided) {
        //add point
        game.current.dispatch({type: 'ADD_POINT'});

        //mark ball
        entities.ball.hitCircle = true;
        
        //delete player
        let xPos = entities.player.body.position.x;
        let yPos = entities.player.body.position.y;
        Matter.Composite.remove(world, entities.player.body);        
        delete entities.player;

        //PlusOne indication
        entities.plusOne = {
          xPos: xPos,
          yPos: yPos,
          renderer: PlusOne,
        }

        //create new player
        const player = Matter.Bodies.rectangle(side, screen.height / 2.5, playerSize, playerSize, {
            density: 0.04,
            frictionAir: 0.005,
            trajectory: trajectory
        });

        Matter.World.add(world, player);
        entities.player = {
            body: player,
            size: [playerSize, playerSize],
            color: 'red',
            renderer: Player
        };
      }   
    } 
      
    return entities;
};

const PlayerTrajectoryNative = (entities, { screen }) => {
    const playerBody = entities.player.body;
    const playerSize = entities.player.size[1];
    const { side, trajectory } = randomSide(playerSize, screen.width);

    if (playerBody.position.x > screen.width + playerSize || playerBody.position.x < 0 - playerSize) {
        Matter.Body.set(playerBody, {
            trajectory: trajectory
        });

        Matter.Body.setPosition(playerBody, {
            x: side,
            y: screen.height / 2.5
        });
    }

    Matter.Body.setPosition(playerBody, {
        x: playerBody.position.x + playerBody.trajectory,
        y: playerBody.position.y
    });

    return entities;
};

const PlayerTrajectoryWeb = (entities, {window}) => {
    let playerBody = entities.player.body;
    let playerSize = entities.player.size[1];
    let {side, trajectory} = randomSide(playerSize, window.innerWidth);
    
    if (playerBody.position.x > window.innerWidth + playerSize || playerBody.position.x < 0 - playerSize) {
      Matter.Body.set(playerBody, {
        trajectory: trajectory,
      });
  
      Matter.Body.setPosition(playerBody, {
        x: side,
        y: window.innerHeight / 2.5,
      });
    }
  
    Matter.Body.setPosition(playerBody, {
      x: playerBody.position.x + playerBody.trajectory,
      y: playerBody.position.y,
    });
    
    return entities;
  };

const PlayerCollision = Platform.OS === 'ios' || Platform.OS === 'android' ? PlayerCollisionNative : PlayerCollisionWeb;
const PlayerTrajectory = Platform.OS === 'ios' || Platform.OS === 'android' ? PlayerTrajectoryNative : PlayerTrajectoryWeb;

export { PlayerCollision, PlayerTrajectory };