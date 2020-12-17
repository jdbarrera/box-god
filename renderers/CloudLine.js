import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';

const CloudLine = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = 0;
    const y = props.yPos;
    
    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            backgroundColor:  props.color || "pink",
            zIndex: 2,
          }}/>
    );
}

CloudLine.propTypes = {
    size: PropTypes.array, 
    color: PropTypes.string
}

export default CloudLine;