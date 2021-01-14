import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Game from '../Game';
import {connect} from 'react-redux';
import {getUser} from '../redux/selectors';
import {loginUserFailure, getHighScoreBeog, refreshUserBeog} from '../redux/actions';
import Login from './Login';
import UserInfo from './UserInfo';
import Bezos from '../renderers/Bezos';
import CreateAccount from './CreateAccount';

const backgroundImage = require('../assets/Full-background.png');
const { width, height } = Dimensions.get("screen");

class StartScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isLoggedIn: false,
      isCreateAccount: false,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.returnHome = this.returnHome.bind(this);
  }

  componentDidMount() {
    //refresh token
    if (this.props.user.token) { 
      this.refreshUser(); 
    }
  }

  refreshUser = async () => {
    this.props.refreshUserBeog(this.props.user.token);
  }

  handleStartClick() {
    this.setState(prevState => ({
      ...prevState,
      isPlaying: true,
    }));
  }

  handleCreateAccount() {
    this.setState(prevState => ({
      ...prevState,
      isCreateAccount: true,
    }));
  }

  returnHome = () => {
    this.setState(prevState => ({
      ...prevState,
      isPlaying: false,
      isCreateAccount: false,
    }));
  }

  setIsLoggedIn = () => {
    this.setState(prevState => ({
      ...prevState,
      isLoggedIn: true,
    }))
  }

  render() {
    const isPlaying = this.state.isPlaying;
    const isCreateAccount = this.state.isCreateAccount;
    console.log(this.props.user);

    if (!isPlaying) {
      if (isCreateAccount && !this.props.user.token) {
        return (
          <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>            
              <View style={styles.overlay}>                
                <Bezos size={[width/3, height/4]} />   
                {this.props.user.error && <Text style={styles.errorText}>{this.props.user.error}</Text>}
                <CreateAccount returnHome={this.returnHome} />
                <Text style={styles.companyTags}>BeOG & Sight Productions</Text>
              </View>  
            </ImageBackground>  
          </View>          
        )        
      } else {
        return (
          <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>            
              <View style={styles.overlay}>
                <Bezos size={[width/3, height/4]} />   
                <Text style={styles.headerText}>BOX GOD</Text>
                {this.props.user.error && <Text style={styles.errorText}>{this.props.user.error}</Text>}
                {this.props.user.token
                  ? <UserInfo handleStart={this.handleStartClick} />
                  : <Login handleCreateAccount={this.handleCreateAccount} />
                }
                <Text style={styles.companyTags}>BeOG & Sight Productions</Text>
              </View>  
            </ImageBackground>  
          </View>
        );
      }      
    } else {
      return ( <Game returnHome={this.returnHome} /> );
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
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorText: {
    color: '#ff2400',
    fontSize: 16,
  },
  companyTags: {
    paddingTop: 20,
    color: '#ffffff',
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, {
  getUser, loginUserFailure, getHighScoreBeog, refreshUserBeog
})(StartScreen);