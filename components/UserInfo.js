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
    paddingLeft: 30, paddingRight: 30,
    borderRadius: 30,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  }
});

const UserInfo = (props) => {
  const [firstName, setFirstName] = useState('');

  const handleNameUpdate = name => {
    setFirstName(name);
  };

  const logout = async () => {
    props.logoutUserBeog(props.user.token);
  }
    
    return (
      <View style={styles.userInfo}>
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <View>
              <Text style={styles.userName}>Welcome: {props.user.displayname}</Text>
              <TouchableOpacity style={[styles.button, styles.border]} onPress={props.handleStart} >
                <Text style={styles.text}>Start!</Text>
              </TouchableOpacity>
            </View>}
        <TouchableOpacity style={styles.button} onPress={logout} >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
  score: getScore(state),
});

export default connect(mapStateToProps, {logoutUserBeog, getHighScoreBeog, getScore})(UserInfo);