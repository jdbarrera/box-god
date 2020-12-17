import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  scoreView: {
    alignItems: 'flex-start',
    flex: 0.5,
    paddingTop: Constants.statusBarHeight / 2,
    paddingLeft: Constants.statusBarHeight / 2,
  },
});

const ScoreView = (props) => {
    
    return (
      <View style={styles.scoreView}>
        <Text>Score: {props.score.points}</Text>
        <Text>Lives: {props.score.lives}</Text>
      </View>
    )
}

ScoreView.propTypes = {
    score: PropTypes.object,
}

export default ScoreView;