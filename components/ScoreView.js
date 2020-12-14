import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  scoreView: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
  },
});

const ScoreView = (props) => {
    const score = props.score;
    const xPos = props.xPos;
    
    return (
      <View style={styles.scoreView}>
        <Text>Score: {score}</Text>
      </View>
    )
}

ScoreView.propTypes = {
    score: PropTypes.number,
}

export default ScoreView;