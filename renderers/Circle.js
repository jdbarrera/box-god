import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';

const Circle = (props) => {
    const width = props.size[0];
    const height = props.size[0];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const radius = props.size[1];
    const angle = props.body.angle;
    
    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            borderRadius: radius,
            transform: [{ rotate: angle + "rad" }],
            backgroundColor:  props.color || "pink"
          }}/>
    );
}

Circle.propTypes = {
    size: PropTypes.array,
    body: PropTypes.object, 
    color: PropTypes.string
}

export default Circle;