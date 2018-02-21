import React, { Component } from "react";
import {Image} from 'react-native';
import { StyleSheet,View, TouchableOpacity } from "react-native";
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
    return <Container>
        <HeaderComponent navigation={navigation} displayHeader={displayHeader} />
        <Content>
          <Card>
            <CardItem button onPress={() => navigation.navigate(
                  "Temperature",
                  { zoneId: 1234 }
                )}>
              <Icon active name="home" style={styles.iconColor} />
              <Text>Home</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem button onPress={() => navigation.navigate(
                  "Temperature",
                  { zoneId: 54321 }
                )}>
              <Image source={require("HVAC/assets/Images/office.png")} style={styles.imageSize} />
              <Text>Office</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
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
