import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Button, Alert, } from 'react-native';
import Constants from 'expo-constants';

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
    this.handleStartClick = this.handleStartClick.bind(this);
    this.state = {isPlaying: false};
  }

  handleStartClick() {
    this.setState({isPlaying: true});
    console.log("it worked");
  }

  render() {
    return (
      <View style={styles.start}>
        <Text style={{fontSize: 40}}>BOX GOD</Text>
        <Button
          title="Start"
          onPress={this.handleStartClick}
        />
      </View>
    );
  }
}

export default GameControl;
