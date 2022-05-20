import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scoreView: {
        alignItems: 'flex-start',
        flex: 0.5,
    },
    text: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const ScoreView = props => {
    return (
        <View style={styles.scoreView}>
            <Text style={styles.text}>Score: {props.points}</Text>
            <Text style={styles.text}>Lives: {props.lives}</Text>
        </View>
    );
};

export default ScoreView;