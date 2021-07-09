import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
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
    borderRadius: 30,
    width: 200,
  },
  createAccountButton: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 250,
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
  },
  errorText: {
    color: '#ff2400',
    fontSize: 16,
  },
});

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const handleUsernameUpdate = username => {
    setFormErrorMsg('');
    setEmail(username);
  };

  const handlePasswordUpdate = password => {
    setFormErrorMsg('');
    setPassword(password);
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validateForm = () => {
    if (validateEmail(email) && password.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
      setFormErrorMsg('Invalid Form Entry')
    }
  };

  const login = async () => {
    validateForm();
    if (formValid) {
      let user = {
        email: email,
        password: password
      }
      props.loginUserBeog(user);
    }    
  }
    
    return (      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.login}
      >
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <View style={styles.login}>
              <Text style={styles.text}>Login</Text>
              {formErrorMsg !== '' && <Text style={styles.errorText}>{formErrorMsg}</Text>}
              <TextInput
                placeholder="email"
                placeholderTextColor='#ffffff'
                value={email}
                onChangeText={handleUsernameUpdate}
                autoCapitalize="none"
                style={styles.input}
              />
              <TextInput
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
              <TouchableOpacity style={styles.createAccountButton} onPress={props.handleStartClick} >
                <Text style={styles.text}>Play as Guest</Text>
              </TouchableOpacity>
            </View>
        }
      </KeyboardAvoidingView>  
      
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { getUser, loginUserBeog })(Login);