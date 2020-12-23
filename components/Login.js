import React, { Component, useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, Text } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {connect} from 'react-redux';

import ControlCenter from './ControlCenter';
import ScoreView from './ScoreView';

import {loginUserBeog} from '../redux/actions';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameUpdate = username => {
    setEmail(username);
  };

  const handlePasswordUpdate = password => {
    setPassword(password);
  };

  const login = async () => {
    let user = {
      email: email,
      password: password
    }
    props.loginUserBeog(user);
    props.setIsLoggedIn(true);    
  }

  useEffect(() => {
    //validate credentials
  }, []); 
    
    return (
      <View style={styles.login}>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={handleUsernameUpdate}
          autoCapitalize="none"
        />
        <TextInput
          style={{paddingTop: 20}}
          placeholder="password"
          value={password}
          onChangeText={handlePasswordUpdate}
        />
        <Button title="Press to Log In" onPress={login} />
      </View>
    );
}

export default connect(null, {loginUserBeog})(Login);