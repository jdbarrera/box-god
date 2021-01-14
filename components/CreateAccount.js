import React, { useState } from "react";
import { View, Button, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity } from "react-native";
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
    width: 200,
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

const CreateAccount = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameUpdate = name => {
    setFirstName(name);
  };

  const handleLastNameUpdate = name => {
    setLastName(name);
  };

  const handleEmailUpdate = email => {
    setEmail(email);
  };

  const handlePasswordUpdate = password => {
    setPassword(password);
  };

  const createAccount = async () => {
    let user = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      AUTH_KEY: AUTH_KEY,
    }
    props.createUserBeog(user);
  }
    
    return (      
      <View style={styles.login}> 
        {props.user.loading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : <View style={styles.login}>
              <Text style={styles.text}>Create a BeOG Account</Text>
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
                style={{paddingTop: 20}}
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
      </View>  
      
    );
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { createUserBeog })(CreateAccount);