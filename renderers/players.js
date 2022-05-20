import React from 'react';
import { View, Image } from 'react-native';

const player = require('../assets/playerRight.png');

const Player = props => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const angle = props.body.angle;

    return (
        <View
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                borderRadius: 100,
                transform: [{ rotate: angle + 'rad' }]
            }}
        >
            <Image
                style={{
                    height: height,
                    width: width,
                    resizeMode: 'contain'
                }}
                source={player}
            />
        </View>
    );
};

export default Player;