import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const bezosImage = require('../assets/bezos-face.png');

const Bezos = ( props ) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.xPos - width / 2;
    const y = props.yPos - height / 2;
    
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
}

Bezos.propTypes = {
    size: PropTypes.array, 
    color: PropTypes.string
}

export default Bezos;