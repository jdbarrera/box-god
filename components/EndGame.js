import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadHighScoreBeog, getHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';
import EndScore from './EndScore';

const styles = StyleSheet.create({
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
  endGameText: {
    color: '#ffffff',    
    fontSize: 24,
    paddingTop: 40,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 24,
    paddingBottom: 10,
  },
  highScoreText: {
    color: '#ffffff',
    fontSize: 24,
    paddingBottom: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    paddingLeft: 30, paddingRight: 30,
    borderRadius: 30,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  }
});

const EndGame = (props) => {

  const uploadScore = async () => {
    if (props.score.points > props.score.hiScore) {
      props.uploadHighScoreBeog(props.score.points, props.user.token);
    }    
  }

  useEffect(() => {
    uploadScore();
  }, []);
    
    return (
      <View style={styles.overlay}>
        <Text style={styles.endGameText}>Game Over</Text>
        <Text style={styles.scoreText}>Score: {props.currentScore}</Text>
        {props.score.loading
        ? <ActivityIndicator size="large" color="#00ff00" />
        : <EndScore userToken={props.user.token} userHiScore={props.score.hiScore}/> }
        <TouchableOpacity
          style={[styles.button, styles.border]}
          onPress={props.restart}
        >
          <Text style={styles.text} >Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={props.returnToHome}
        >
          <Text style={styles.text} >Return to Home Screen</Text>
        </TouchableOpacity>
      </View>
    );
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