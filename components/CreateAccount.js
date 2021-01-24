import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { connect } from 'react-redux';
import { createUserBeog } from '../redux/actions';
import { getUser } from '../redux/selectors';

const AUTH_KEY = 'SuperSpecialBeOG690';

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
    width: 230,
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

const CreateAccount = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const handleFirstNameUpdate = name => {
    setFormErrorMsg('');
    setFirstName(name);
  };

  const handleLastNameUpdate = name => {
    setFormErrorMsg('');
    setLastName(name);
  };

  const handleEmailUpdate = email => {
    setFormErrorMsg('');
    setEmail(email);
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
    if (firstName.length > 0 && lastName.length > 0 && validateEmail(email) && password.length > 8) {
      setFormValid(true);
    } else {
      setFormValid(false);
      setFormErrorMsg('Invalid Form Entry')
    }
  };

  const createAccount = async () => {
    validateForm();
    if (formValid) {
      let user = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        AUTH_KEY: AUTH_KEY,
      }
      props.createUserBeog(user);
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
              <Text style={styles.text}>Create a BeOG Account</Text>
              {formErrorMsg !== '' && <Text style={styles.errorText}>{formErrorMsg}</Text>}
              <TextInput
                placeholder="First Name"
                placeholderTextColor='#ffffff'
                value={firstName}
                onChangeText={handleFirstNameUpdate}
                autoCapitalize="words"
                style={styles.input}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor='#ffffff'
                value={lastName}
                onChangeText={handleLastNameUpdate}
                autoCapitalize="words"
                style={styles.input}
              />
              <TextInput
                placeholder="email"
                placeholderTextColor='#ffffff'
                value={email}
                onChangeText={handleEmailUpdate}
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
              <TouchableOpacity style={styles.button} onPress={createAccount} >
                <Text style={styles.text}>Create BeOG Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.border]} onPress={props.returnHome} >
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            </View>
        }
      </KeyboardAvoidingView>  
      
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { createUserBeog })(CreateAccount);