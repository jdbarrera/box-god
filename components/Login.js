import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const styles = StyleSheet.create({
    login: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#3CB371',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        width: 200
    },
    createAccountButton: {
        alignItems: 'center',
        backgroundColor: '#00C358',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 250
    },
    text: {
        color: '#ffffff',
        fontSize: 20
    },
    border: {
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        color: '#ffffff',
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        margin: 20,
        width: 150
    },
    exitButton: {
        alignItems: 'center',
        backgroundColor: '#ff2400',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        marginTop: 20,
        width: 250
    }
});

const Login = props => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.login}>
            <View style={styles.login}>
                <TouchableOpacity style={styles.createAccountButton} onPress={props.handleStartClick}>
                    <Text style={styles.text}>Play</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;