import React, { Component, useState, useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { logoutUserBeog, getHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    color: '#ffffff',
    fontSize: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  }
});

const UserInfo = (props) => {
  const logout = async () => {
    props.logoutUserBeog(props.user.token);
  }

  const howToPlay = () => {
    props.handleHowToPlay(false);
  }

  return (
    <View style={styles.userInfo}>
      {props.user.loading
        ? <ActivityIndicator size="large" color="#00ff00" />
        : <View style={styles.userInfo}>
            <Text style={styles.userName}>Welcome: {props.user.displayname}</Text>
            <TouchableOpacity style={[styles.button, styles.border]} onPress={props.handleStart} >
              <Text style={styles.text}>Start!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={howToPlay} >
              <Text style={styles.text}>How To Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.border]} onPress={logout} >
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
      }        
    </View>
  );    
}

const mapStateToProps = state => ({
  user: getUser(state),
  score: getScore(state),
});

export default connect(mapStateToProps, {logoutUserBeog, getHighScoreBeog, getScore})(UserInfo);