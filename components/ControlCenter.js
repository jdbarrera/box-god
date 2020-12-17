import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  pauseButton: {
    alignItems: 'flex-end',
    flex: 0.5,
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

export default ControlCenter;