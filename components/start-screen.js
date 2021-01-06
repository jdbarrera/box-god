import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Game from '../Game';
import {connect} from 'react-redux';
import {getUser} from '../redux/selectors';
import {loginUserFailure, getHighScoreBeog, refreshUserBeog} from '../redux/actions';
import Login from './Login';
import UserInfo from './UserInfo';

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

  componentDidMount() {
    //refresh token
    if (this.props.user.token) { 
      this.refreshUser(); 
      this.props.getHighScoreBeog(this.props.user.token);
    }
  }

  refreshUser = async () => {
    this.props.refreshUserBeog(this.props.user.token);
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
    console.log(this.props.user);
    if (!isPlaying) {
      return (
        <View style={styles.start}>        
          <Text style={{fontSize: 40}}>BOX GOD</Text>
          {this.props.user.error && <Text>{this.props.user.error}</Text>}
          {this.props.user.token
            ? <UserInfo />
            : <Login />
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

export default connect(mapStateToProps, {
  getUser, loginUserFailure, getHighScoreBeog, refreshUserBeog
})(StartScreen);