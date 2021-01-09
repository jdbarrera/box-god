import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { loginUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

const styles = StyleSheet.create({
  login: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    paddingLeft: 30, paddingRight: 30,
    borderRadius: 30,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    color: '#ffffff',
    borderColor: '#ffffff',
    borderBottomWidth: 2,
    margin: 20,
    width: 150,
  }
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
  }
    
    return (      
      <View style={styles.login}> 
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <View style={styles.login}>
              <Text style={styles.text}>Login</Text>
              <TextInput
                placeholder="email"
                placeholderTextColor='#ffffff'
                value={email}
                onChangeText={handleUsernameUpdate}
                autoCapitalize="none"
                style={styles.input}
              />
              <TextInput
                style={{paddingTop: 20}}
                placeholder="password"
                placeholderTextColor='#ffffff'
                value={password}
                onChangeText={handlePasswordUpdate}
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity style={styles.button} onPress={login} >
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
              <Text style={[styles.text, styles.border]}>-------- OR --------</Text>
              <TouchableOpacity style={styles.button} onPress={props.handleStart} >
                <Text style={styles.text}>Play as Guest</Text>
              </TouchableOpacity>
            </View>
        }
      </View>  
      
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { getUser, loginUserBeog })(Login);