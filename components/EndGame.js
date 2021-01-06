import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadHighScoreBeog, getHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

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
  gameInfoOverlay: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endGameText: {
    color: '#000000',    
    fontSize: 24,
    paddingTop: 40,
  },
  scoreText: {
    color: '#000000',
    fontSize: 24,
    paddingBottom: 10,
  },
  highScoreText: {
    color: '#000000',
    fontSize: 24,
    paddingBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
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
        <View style={styles.gameInfoOverlay}>
            <Text style={styles.endGameText}>Game Over</Text>
            <Text style={styles.scoreText}>Score: {props.currentScore}</Text>
            {props.score.loading
            ? <ActivityIndicator size="large" color="#00ff00" />
            : <Text style={styles.highScoreText}>Your Current HiScore: {props.score.hiScore}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={props.restart}
            >
              <Text>Restart</Text>
            </TouchableOpacity>
        </View>    
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