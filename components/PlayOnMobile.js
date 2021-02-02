import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { createUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

const backgroundImage = require('../assets/Full-background.png');
const playOnMobileText = 'Please play Box God on your smartphone in portrait orientation.  A desktop version is in development.';

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
});

const PlayOnMobile = (props) => {
    
    return (      
      <View style={styles.container}> 
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <Text style={styles.h1}>Box God</Text>
            <Text style={styles.introText}>{playOnMobileText}</Text>
          </View>
        </ImageBackground>
      </View>        
    );
}

export default PlayOnMobile;