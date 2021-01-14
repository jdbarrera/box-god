import React, { Component, useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import PropTypes from 'prop-types';

const bezosImage = require('../assets/bezos-face.png');
const bezosFaceMad = require('../assets/bezos-face-mad.png');
let facePosCounter = 0;

const Bezos = ( props ) => {
    const[facePos, setFacePos] = useState('tiltLeft');
    const width = props.size[0];
    const height = props.size[1];
    const x = props.xPos - width / 2;
    const y = props.yPos - height / 2;
    

    const changeFacePosition = () => {
        facePosCounter++;
        if (facePosCounter == 2) {
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
    }

    useEffect(() => {
        let timer = setInterval(changeFacePosition, 500);
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
                alignItems: 'center',
                }}>
                <Image style={{
                    height: height,
                    width: width,
                    resizeMode: 'contain',
                    }} source={bezosImage} />
            </View>
        );
    } else if (props.endFace) {
        return (
            <View>
                <Image style={{
                    height: height,
                    width: width,
                    resizeMode: 'contain',
                    }} source={bezosFaceMad} />
            </View>
        );
    } else {
        if (facePos == 'tiltLeft') {
            return (    
                <View style={{transform: [{rotate: '-30deg'}]}} >
                    <Image style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain',
                        }} source={bezosImage} />
                </View>
            );
        } else if (facePos == 'tiltRight') {
            return (    
                <View style={{transform: [{rotate: '30deg'}]}} >
                    <Image style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain',
                        }} source={bezosImage} />
                </View>
            );
        } else {
            return (
                <View>
                    <Image style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain',
                        }} source={bezosImage} />
                </View>
            );            
        }        
    }
    
    
}

Bezos.propTypes = {
    size: PropTypes.array, 
    color: PropTypes.string
}

export default Bezos;