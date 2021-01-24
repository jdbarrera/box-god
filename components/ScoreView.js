import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  scoreView: {
    alignItems: 'flex-start',
    flex: 0.5,
    paddingLeft: Constants.statusBarHeight / 2,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const ScoreView = (props) => {
    
    return (
      <View style={styles.scoreView}>
        <Text style={styles.text} >Score: {props.score.points}</Text>
        <Text style={styles.text} >Lives: {props.score.lives}</Text>
      </View>
    )
}

ScoreView.propTypes = {
    score: PropTypes.object,
}

export default ScoreView;