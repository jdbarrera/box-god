import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  pauseButton: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-end',
  },
});

const ControlCenter = (props) => {
    
    return (
      <View style={styles.pauseButton}>
          <Button
            onPress={props.pauseGame}
            title="Pause"
            color="red"
            accessibilityLabel="Pause the game"
          />
          <Button
            onPress={props.startGame}
            title="Start"
            color="green"
            accessibilityLabel="Start the game"
          />
      </View>
    );
}

ControlCenter.propTypes = {
    size: PropTypes.array,
    body: PropTypes.object, 
    color: PropTypes.string
}

export default ControlCenter;