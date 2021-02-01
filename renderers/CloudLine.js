import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cloud: {
    height: 60,
    width: 80,
    resizeMode: 'contain'
  },
});

const CloudLine = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = 0;
    const y = props.yPos;
    const cloudWidth = styles.cloud.width - 10;
    
    return (
      <View style={{position: 'absolute', zIndex: 2}}>    
        <View 
          style={{
            left: 0, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: 70, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: 140, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: 210, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: 280, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: 350, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
      </View>
    );
}

CloudLine.propTypes = {
    size: PropTypes.array, 
    color: PropTypes.string
}

export default CloudLine;