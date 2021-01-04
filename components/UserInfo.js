import React, { Component, useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { logoutUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';
import { userMeAPI } from '../beogAPI/beogAPI';

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

  const userME = async () => {
    let response = await userMeAPI(props.user.token);
    console.log(response);
  }
    
    return (
      <View style={styles.userInfo}>
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <Text style={styles.userName}>Welcome: {props.user.displayname}</Text>}
        <Button title="Logout" onPress={logout} />
        <Button title="Test User/me API" onPress={userME} />
      </View>
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, {logoutUserBeog})(UserInfo);