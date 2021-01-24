import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { createUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

const backgroundImage = require('../assets/Full-background.png');
const introText = 'You are a god capable of creating boxes at will.  Prove that you are the true box god and take down rival box god Jeff Bezos.';
const instructionText = 'Rules of the game:\nBoxes can be created above the cloud line.  A point is gained when you hit a circle.  A life is lost when you hit the ground or a platform.  You have three lives.  Show Bezos who the real box god is!';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1: {
    color: '#ffffff',
    fontSize: 30,
  },
  introText: {
    color: '#ffffff',
    fontSize: 20,
    margin: 20,
  },
  instructionText: {
    color: '#ffffff',
    fontSize: 20,
    margin: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  }
});

const HowToPlay = (props) => {
  const [firstName, setFirstName] = useState('');

  const handleFirstNameUpdate = name => {
    setFirstName(name);
  };

  const goBack = () => {
    props.handleHowToPlay(true);
  }
    
    return (      
      <View style={styles.container}> 
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.h1}>How To Play</Text>
            <Text style={styles.introText}>{introText}</Text>
            <Text style={styles.instructionText}>{instructionText}</Text>
            <TouchableOpacity style={[styles.button, styles.border]} onPress={goBack} >
              <Text style={styles.text}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>        
    );
}

export default HowToPlay;