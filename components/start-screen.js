import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Game from '../Game';
import {connect} from 'react-redux';
import {getUser} from '../redux/selectors';
import {loginUserFailure, getHighScoreBeog, refreshUserBeog} from '../redux/actions';
import Login from './Login';
import UserInfo from './UserInfo';

const backgroundImage = require('../assets/Full-background.png');
const { width, height } = Dimensions.get("screen");

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
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>      
            <Text style={styles.headerText}>BOX GOD</Text>
            {this.props.user.error && <Text style={styles.text}>{this.props.user.error}</Text>}
            {this.props.user.token
              ? <UserInfo handleStart={this.handleStartClick} />
              : <Login handleStart={this.handleStartClick} />
            }
            <Text style={styles.companyTags}>BeOG & Sight Productions</Text>
          </ImageBackground>  
        </View>
      );
    } else {
      return ( <Game /> );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    marginTop: 230,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  companyTags: {
    color: '#ffffff',
    paddingTop: 100,
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    paddingLeft: 30, paddingRight: 30,
    borderRadius: 30,
  },
});

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, {
  getUser, loginUserFailure, getHighScoreBeog, refreshUserBeog
})(StartScreen);