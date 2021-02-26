import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import PropTypes from 'prop-types';

//const { windowWidth, windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  cloud: {
    height: 60,
    width: 80,
    resizeMode: 'contain',
    marginRight: -10,
  },
});

const CloudLine = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = 0;
    const y = props.yPos;
    const cloudWidth = styles.cloud.width - 10;
    const cloudIterations = Math.ceil(width / 80);

    return (
      <View style={{width: width, position: 'absolute', zIndex: 2}}>    
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
      /*<View
        style={{
            position: "absolute",
            top: y,
            width: width,
            overflow: 'hidden',
            flexDirection: 'row'
        }}>
      {Array.apply(null, Array(cloudIterations)).map(( el, idx ) => {
        return <Image style={styles.cloud} key={idx} source={require('../assets/cloud-37010_640.png')} />
      })}
      </View>*/
    );
}

CloudLine.propTypes = {
    size: PropTypes.array, 
    color: PropTypes.string
}

export default CloudLine;