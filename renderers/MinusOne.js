import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';

const MinusOne = (props) => {
    const x = props.xPos;
    const y = props.yPos;
    
    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            zIndex: 1,
          }}>
        <Text style={{
          color: 'red',
          fontSize: 16,
          }}>- 1</Text>  
      </View>
    );
}

MinusOne.propTypes = {
    xPos: PropTypes.number,
    yPos: PropTypes.number,
}

export default MinusOne;