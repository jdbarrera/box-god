import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

const purchasePassTxt = 'You must purchase a Round 1 Pass to upload your score.  Return to the home screen to learn more.';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 24,
    paddingBottom: 10,
  },
  purchasePassTxt: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const EndGame = (props) => {
    if (props.purchasedPass) {
        return (
            <View style={styles.centerView}>
              <Text style={styles.text}>Your Current HiScore: {props.userHiScore}</Text>
            </View>    
          );
    } else {
        return (
            <View style={styles.centerView}>
              <Text style={styles.purchasePassTxt}>{purchasePassTxt}</Text>
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

export default connect(mapStateToProps, {uploadHighScoreBeog, getScore})(EndGame);