import React, { Component, useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { View, Button, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { logoutUserBeog } from '../redux/actions';
import { getUser, getScore } from '../redux/selectors';

const purchaseTicketTxt = 'Box God Round 1 is in now session. Purchase a pass below if you want your score to upload.  The top player by February 30 will win $50.';
const passPurchasedTxt = "Your Round 1 pass has been purchased and verified!";

const styles = StyleSheet.create({
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  passPurchasedTxt: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  purchaseTicketTxt: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3CB371",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: "#ff2400",
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  ticketButton: {
    alignItems: "center",
    backgroundColor: "#d4af37",
    marginTop: 10,
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 30,
    width: 200,
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
  }
});

const UserInfo = (props) => {
  const [passPurchaseView, setPassPurchaseView] = useState(false);

  const logout = async () => {
    props.logoutUserBeog(props.user.token);
  }

  const howToPlay = () => {
    props.handleHowToPlay(false);
  }

  const handlePassPurchase = () => {
    setPassPurchaseView(!passPurchaseView);
  }

  const handleGoBack = () => {
    setPassPurchaseView(!passPurchaseView);
    props.refreshUser();
  }

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://be-og.com/my-account-2/');
  };
 
  return (
    <View style={styles.userInfo}>
      {props.user.loading
        ? <ActivityIndicator size="large" color="#00ff00" />
        : <View style={styles.userInfo}>
            {passPurchaseView
              ? 
                <View style={styles.userInfo}>
                  <Text style={styles.purchaseTicketTxt}>{purchaseTicketTxt}</Text>
                  <TouchableOpacity style={[styles.button, styles.border]} onPress={handleOpenWithWebBrowser} >
                    <Text style={styles.text}>Purchase Pass</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleGoBack} >
                    <Text style={styles.text}>Go Back</Text>
                  </TouchableOpacity>
                </View>
              : 
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>User: {props.user.displayname}</Text>
                  {props.user.purchasedPass
                    ? 
                      <Text style={styles.passPurchasedTxt}>{passPurchasedTxt}</Text> 
                    : 
                      <TouchableOpacity style={[styles.ticketButton]} onPress={handlePassPurchase} >
                        <Text style={styles.text}>Purchase Pass</Text>
                      </TouchableOpacity>
                  }
                  
                  <TouchableOpacity style={[styles.button, styles.border]} onPress={props.handleStart} >
                    <Text style={styles.text}>Start!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button]} onPress={howToPlay} >
                    <Text style={styles.text}>How To Play</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.logoutButton, styles.border]} onPress={logout} >
                    <Text style={styles.text}>Logout</Text>
                  </TouchableOpacity>
                </View>
            }
            
          </View>
      }        
    </View>
  );    
}

const mapStateToProps = state => ({
  user: getUser(state),
  score: getScore(state),
});

export default connect(mapStateToProps, {logoutUserBeog, getScore})(UserInfo);