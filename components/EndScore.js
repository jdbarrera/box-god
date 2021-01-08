import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadHighScoreBeog, getHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

const styles = StyleSheet.create({
  highScoreText: {
    color: '#000000',
    fontSize: 24,
    paddingBottom: 10,
  },
});

const EndGame = (props) => {
    if (props.userToken) {
        return (
            <View>
              <Text style={styles.highScoreText}>Your Current HiScore: {props.userHiScore}</Text>
            </View>    
          );
    } else {
        return (
            <View>
              <Text style={styles.highScoreText}>Please Login to track High Score.</Text>
            </View>    
          );
    }
    
}

EndGame.propTypes = {
    currentScore: PropTypes.number,
    restart: PropTypes.func,
}

const mapStateToProps = state => ({
  user: getUser(state),
  score: getScore(state),
});

export default connect(mapStateToProps, {uploadHighScoreBeog, getHighScoreBeog, getScore})(EndGame);