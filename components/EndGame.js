import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import Bezos from '../renderers/Bezos';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
    endGameText: {
        color: '#ffffff',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10
    },
    scoreText: {
        color: '#ffffff',
        fontSize: 24,
        paddingBottom: 10
    },
    highScoreText: {
        color: '#ffffff',
        fontSize: 24,
        paddingBottom: 10
    },
    text: {
        color: '#ffffff',
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#3CB371',
        paddingTop: 10,
        paddingBottom: 10,
        width: 250,
        borderRadius: 30
    },
    exitButton: {
        alignItems: 'center',
        backgroundColor: '#ff2400',
        paddingTop: 10,
        paddingBottom: 10,
        width: 250,
        borderRadius: 30
    },
    border: {
        marginTop: 20,
        marginBottom: 20
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const EndGame = props => {
    return (
        <View style={styles.overlay}>
            <Bezos endFace={true} size={[width / 3, height / 4]} />
            <Text style={styles.endGameText}>Game Over</Text>
            <Text style={styles.scoreText}>Score: {props.currentScore}</Text>
            <View style={styles.centerView}>
                <TouchableOpacity style={[styles.button, styles.border]} onPress={props.restart}>
                    <Text style={styles.text}>Restart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={props.returnToHome}>
                    <Text style={styles.text}>Return to Home Screen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EndGame;