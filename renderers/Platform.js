import React, { Component } from "react";
import { View, Image } from "react-native";
import PropTypes from 'prop-types';

const platformImage = require('../assets/green-plat.png')

const Platform = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    
    return (
      <Image
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
          }}
          resizeMode='stretch'
          source={platformImage} />
    );
}

Platform.propTypes = {
    size: PropTypes.array,
    body: PropTypes.object,
}

export default Platform;