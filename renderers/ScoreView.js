import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';

const ScoreView = (props) => {
    const score = props.score;
    const xPos = props.xPos;
    
    return (
      <View>
        <Text>Score: {score}</Text>
        <Text>xPos: {xPos}</Text>
      </View>
    )
}

ScoreView.propTypes = {
    score: PropTypes.number,
}

export default ScoreView;