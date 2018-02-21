import React, { Component } from "react";
import {Image} from 'react-native';
import { StyleSheet,View, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Button
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderComponent from '../headerComponent';
import Temperature from "./Temperature"; 
import Location from "./Location";
export default class Zones extends Component {
  render() {
  const { navigation } = this.props;
  const displayHeader = { BackBtn: false, MenuBtn:false };
  let data = [{ value: "Sora" }, { value: "Kira" }, { value: "Exec Office" }, { value: "Exec Office" }];
    return <Container>
        <HeaderComponent navigation={navigation} displayHeader={displayHeader} />
        <Content>
          <Dropdown label="Select Zone" data={data} padder/>
        </Content>
      </Container>;
  }
}

const styles = StyleSheet.create({
  imageSize: {
    width: 20,
    height: 20,
    marginRight: 15
  },
  iconColor: {
    color: "#3ec7c2"
  }
});
