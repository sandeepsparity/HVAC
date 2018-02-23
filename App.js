import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Root } from "native-base";
import RootStack from "HVAC/src/config/routing";

export default class App extends React.Component {
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
