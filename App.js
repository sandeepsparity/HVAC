import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Root } from "native-base";
import RootStack from "HVAC/src/config/routing";
import { Crashlytics } from 'react-native-fabric'; //Get Crashlytics component

export default class App extends React.Component {
  componentDidMount(){
    //Sets user details
    Crashlytics.setUserName('megaman');
    Crashlytics.setUserEmail('user@email.com');
    Crashlytics.setUserIdentifier('1234');
  }
  render() {
    return  (<Root>
      <RootStack />
      </Root>)

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
