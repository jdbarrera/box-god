import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Button, Alert, State } from 'react-native';
import Constants from 'expo-constants';
import Game from '../Game';
import Login from '../components/Login';
import {connect} from 'react-redux';
import {getUser} from '../redux/selectors';
import {validateUserAPI} from '../beogAPI/beogAPI';

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
  companyTags: {
    paddingTop: 120,
    fontSize: 20,
  }
});

class StartScreen extends React.Component {
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
        <Text style={{fontSize: 20}}>Welcome: {this.props.user.token}</Text>
        <Button
          title="Validate"
          onPress={() => validateUserAPI(this.props.user.token)}
        />
        <Button
          title="Start"
          onPress={this.handleStartClick}
        />
        <Text style={styles.companyTags}>BeOG & Sight Productions</Text>
      </View>
    );
  } else {
    return ( <Game /> );
  }
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, {getUser})(StartScreen);
