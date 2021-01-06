import React, { Component, useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { logoutUserBeog, getHighScoreBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontSize: 20,
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
          : <Text style={styles.userName}>Welcome: {props.user.displayname}</Text>}
        <Button title="Logout" onPress={logout} />
      </View>
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
  score: getScore(state),
});

export default connect(mapStateToProps, {logoutUserBeog, getHighScoreBeog, getScore})(UserInfo);