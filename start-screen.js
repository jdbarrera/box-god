import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Button, Alert, } from 'react-native';
import Constants from 'expo-constants';


class Activate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activate: false
    };
  }
}

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

const StartScreen = () => {

  return (
    <View style={styles.start}>
      <Text style={{fontSize: 40}}>BOX GOD</Text>
      <Button
        title="Start"
        onPress={() => this.setState({ activate: this.state == false })}
      />
    </View>
  );
}


export default StartScreen;
