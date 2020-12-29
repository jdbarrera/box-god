import React, { Component, useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, Text } from "react-native";
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import ControlCenter from './ControlCenter';
import ScoreView from './ScoreView';
import { logoutUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

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

  const logout = async () => {
    props.logoutUserBeog(props.user.token);
  }
    
    return (
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Welcome: {props.user.displayname}</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, {logoutUserBeog})(UserInfo);