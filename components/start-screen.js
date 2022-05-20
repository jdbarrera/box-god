import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Game from '../Game';
import Login from './Login';
import Bezos from '../renderers/Bezos';
import HowToPlay from './HowToPlay';

const backgroundImage = require('../assets/baseballBackground.png');
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        fontSize: 40
    },
    text: {
        color: '#ffffff',
        fontSize: 20
    },
    errorText: {
        color: '#ff2400',
        fontSize: 16
    },
    companyTags: {
        paddingTop: 20,
        color: '#ffffff',
        fontSize: 20
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class StartScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            isHowToPlay: false
        };

        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleHowToPlay = this.handleHowToPlay.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }

    handleStartClick() {
        this.setState(prevState => ({
            ...prevState,
            isPlaying: true
        }));
    }

    handleHowToPlay(goBack) {
        if (goBack) {
            this.setState(prevState => ({
                ...prevState,
                isHowToPlay: false
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                isHowToPlay: true
            }));
        }
    }

    returnHome = () => {
        this.setState(prevState => ({
            ...prevState,
            isPlaying: false
        }));
    };

    render() {
        const isPlaying = this.state.isPlaying;
        const isHowToPlay = this.state.isHowToPlay;

        if (!isPlaying) {
            if (isHowToPlay) {
                return <HowToPlay handleHowToPlay={this.handleHowToPlay} />;
            } else {
                return (
                    <View style={styles.container}>
                        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                            <View style={styles.overlay}>
                                <Bezos size={[width, height / 2]} />
                                <Login handleStartClick={this.handleStartClick} />
                                <Text style={styles.companyTags}>The Action Network</Text>
                            </View>
                        </ImageBackground>
                    </View>
                );
            }
        } else {
            return <Game returnHome={this.returnHome} />;
        }
    }
}

export default StartScreen;