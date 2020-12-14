import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Button, Alert, State } from 'react-native';
import Constants from 'expo-constants';
import Game from './Game';

const styles = StyleSheet.create({

  start: {
    fontWeight: 'bold',
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0, left: 0,
    right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

class GameControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this.handleStartClick = this.handleStartClick.bind(this);
  }

  handleStartClick() {
    this.setState({isPlaying: true});
    console.log(this.state.isPlaying);
  }

  render() {
    const isPlaying = this.state.isPlaying;
    if (!isPlaying) {
    return (
      <View style={styles.start}>
        <Text style={{fontSize: 40}}>BOX GOD</Text>
        <Button
          title="Start"
          onPress={this.handleStartClick}
        />
      </View>
    );
  } else {
    return ( <Game /> );
  }
  }
}

export default GameControl;
