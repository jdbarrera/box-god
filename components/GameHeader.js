import React from 'react';
import { View, StyleSheet } from 'react-native';
import ControlCenter from './ControlCenter';
import ScoreView from './ScoreView';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    gameHeader: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'row'
    }
});

const GameHeader = props => {
    return (
        <View style={styles.gameHeader}>
            <ScoreView points={props.points} lives={props.lives} />
            <ControlCenter
                startGame={props.startGame}
                pauseGame={props.pauseGame}
                isRunning={props.isRunning}
                returnHome={props.returnHome}
            />
        </View>
    );
};

export default GameHeader;