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
            left: x, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: x + cloudWidth, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: x + cloudWidth * 2, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: x + cloudWidth * 3, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: x + cloudWidth * 4, top: y, position: 'absolute'
          }}>
            <Image style={styles.cloud} source={require('../assets/cloud-37010_640.png')} />
        </View>
        <View 
          style={{
            left: x + cloudWidth * 5, top: y, position: 'absolute'
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