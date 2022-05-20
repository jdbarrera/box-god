import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
    pauseButtonContainer: {
        alignItems: 'flex-end',
        flex: 0.5
    },
    pauseButton: {
        alignItems: 'center',
        backgroundColor: '#ff2400',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        width: 100,
        marginRight: 10
    },
    homeButton: {
        alignItems: 'center',
        backgroundColor: '#ff2400',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        width: 100,
        marginRight: 10
    },
    startButton: {
        alignItems: 'center',
        backgroundColor: '#3CB371',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 30,
        width: 100,
        marginRight: 10
    },
    text: {
        color: '#ffffff',
        fontSize: 20
    }
});

const ControlCenter = props => {
    return (
        <View style={styles.pauseButtonContainer}>
            {props.isRunning ? (
                <TouchableOpacity style={styles.pauseButton} onPress={props.pauseGame}>
                    <Text style={styles.text}>Pause</Text>
                </TouchableOpacity>
            ) : (
                <View>
                    <TouchableOpacity style={styles.startButton} onPress={props.startGame}>
                        <Text style={styles.text}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.homeButton} onPress={props.returnHome}>
                        <Text style={styles.text}>Home</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ControlCenter;