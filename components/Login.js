import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { loginUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

const styles = StyleSheet.create({
  login: {
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
  }
    
    return (      
      <View style={styles.login}> 
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <View style={styles.login}>
              <Text>Login</Text>
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
        }
      </View>  
      
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { getUser, loginUserBeog })(Login);