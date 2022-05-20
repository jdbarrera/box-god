import Matter from 'matter-js';
import Ball from '../renderers/Balls';
import MinusOne from '../renderers/MinusOne';
import { Platform } from 'react-native';

const ballIds = 0;

const CreateBallNative = (entities, { touches, screen }) => {
    if (!entities.ball) {
        const cloudLine = entities.cloudLine.yPos;
        const world = entities.physics.world;
        const ballSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
        touches
            .filter(t => t.type === 'press')
            .forEach(t => {
                if (t.event.pageY < cloudLine) {
                    const ball = Matter.Bodies.rectangle(t.event.pageX, t.event.pageY, ballSize, ballSize, {
                        frictionAir: 0.021,
                        restitution: 0.5
                    });
                    Matter.World.add(world, ball);
                    entities.ball = {
                        body: ball,
                        size: [ballSize, ballSize],
                        color: ballIds % 2 === 0 ? 'pink' : '#B8E986',
                        hitCircle: false,
                        renderer: Ball
                    };
                }
            });
    }
    return entities;
};

const CreateBallWeb = (entities, { input, window }) => {
    const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  
    if (payload) {
      if (!entities.ball) {
        let cloudLine = entities.cloudLine.yPos;
        let world = entities["physics"].world;
        let ballSize = Math.trunc(
          Math.max(window.innerWidth, window.innerHeight) * 0.075
        );
        if (payload.pageY < cloudLine) {
          let ball = Matter.Bodies.rectangle(
            payload.pageX,
            payload.pageY,
            ballSize,
            ballSize,
            {
              frictionAir: 0.021,
              restitution: 0.5
            }
          );
          Matter.World.add(world, ball);
          entities.ball = {
            body: ball,
            size: [ballSize, ballSize],
            color: ballIds % 2 == 0 ? "pink" : "#B8E986",
            hitCircle: false,
            renderer: Ball
          };
        }
      }
    }
  
    return entities;
  };

const BallCollisions = entities => {
    const world = entities.physics.world;
    const game = entities.physics.game;

    if (entities.floor && entities.ball) {
        const collision = Matter.SAT.collides(entities.floor.body, entities.ball.body);
        if (collision.collided) {
            if (!entities.ball.hitCircle) {
                // subtract point
                game.current.dispatch({ type: 'LIFE_LOST' });
                const xPos = entities.ball.body.position.x;
                const yPos = entities.ball.body.position.y;
                Matter.Composite.remove(world, entities.ball.body);
                delete entities.ball;

                // MinusOne indication
                entities.minusOne = {
                    xPos: xPos,
                    yPos: yPos,
                    renderer: MinusOne
                };
            } else {
                Matter.Composite.remove(world, entities.ball.body);
                delete entities.ball;
            }
        }
    }

    if (entities.platform1 && entities.ball) {
        const collision = Matter.SAT.collides(entities.platform1.body, entities.ball.body);
        if (collision.collided) {
            if (!entities.ball.hitCircle) {
                // subtract point
                game.current.dispatch({ type: 'LIFE_LOST' });
                const xPos = entities.ball.body.position.x;
                const yPos = entities.ball.body.position.y;
                Matter.Composite.remove(world, entities.ball.body);
                delete entities.ball;

                // MinusOne indication
                entities.minusOne = {
                    xPos: xPos,
                    yPos: yPos,
                    renderer: MinusOne
                };
            } else {
                Matter.Composite.remove(world, entities.ball.body);
                delete entities.ball;
            }
        }
    }

    return entities;
};

const CreateBall = Platform.OS === 'ios' || Platform.OS === 'android' ? CreateBallNative : CreateBallWeb;

export { CreateBall, BallCollisions };