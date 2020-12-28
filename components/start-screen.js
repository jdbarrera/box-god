import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Button, Alert, State } from 'react-native';
import Game from '../Game';
import {connect} from 'react-redux';
import {getUser} from '../redux/selectors';
import Login from './Login';

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
    paddingTop: 100,
    fontSize: 20,
  }
});

class StartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isLoggedIn: false,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
  }

  handleStartClick() {
    this.setState(prevState => ({
      ...prevState,
      isPlaying: true,
    }))
  }

  setIsLoggedIn = () => {
    this.setState(prevState => ({
      ...prevState,
      isLoggedIn: true,
    }))
  }

  render() {
    const isPlaying = this.state.isPlaying;
    if (!isPlaying) {
      return (
        <View style={styles.start}>        
          <Text style={{fontSize: 40}}>BOX GOD</Text>
          {this.props.user.token !== ''
            ? <Text style={{fontSize: 20}}>Welcome: {this.props.user.displayname}</Text>
            : <Login setIsLoggedIn={this.setIsLoggedIn} />
          }
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