import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

const bezosImage = require('../assets/logo.png');
const bezosFaceMad = require('../assets/playerEnd.png');
let facePosCounter = 0;

const Bezos = props => {
    const [facePos, setFacePos] = useState('tiltLeft');
    const width = props.size[0];
    const height = props.size[1];
    const x = props.xPos - width / 2;
    const y = props.yPos - height / 2;

    const changeFacePosition = () => {
        facePosCounter++;
        if (facePosCounter === 2) {
            facePosCounter = 0;
        }

        switch (facePosCounter) {
            case 0:
                setFacePos('tiltLeft');
                break;
            case 1:
                setFacePos('tiltRight');
                break;
            default:
                setFacePos('normal');
                break;
        }
    };

    useEffect(() => {
        const timer = setInterval(changeFacePosition, 500);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    if (props.xPos && props.yPos) {
        return (
            <View
                style={{
                    left: x,
                    top: y,
                    position: 'absolute',
                    zIndex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain'
                    }}
                    source={bezosImage}
                />
            </View>
        );
    } else if (props.endFace) {
        return (
            <View>
                <Image
                    style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain'
                    }}
                    source={bezosFaceMad}
                />
            </View>
        );
    } else {
        if (facePos === 'tiltLeft') {
            return (
                <View style={{ transform: [{ rotate: '-30deg' }] }}>
                    <Image
                        style={{
                            height: height,
                            width: width,
                            resizeMode: 'contain'
                        }}
                        source={bezosImage}
                    />
                </View>
            );
        } else if (facePos === 'tiltRight') {
            return (
                <View style={{ transform: [{ rotate: '30deg' }] }}>
                    <Image
                        style={{
                            height: height,
                            width: width,
                            resizeMode: 'contain'
                        }}
                        source={bezosImage}
                    />
                </View>
            );
        } else {
            return (
                <View>
                    <Image
                        style={{
                            height: height,
                            width: width,
                            resizeMode: 'contain'
                        }}
                        source={bezosImage}
                    />
                </View>
            );
        }
    }
};

export default Bezos;