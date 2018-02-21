import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import HeaderComponent from "../headerComponent";
import FooterComponent from "../footer";
export default class Feedback extends Component {
                 state = {};

                 render() {
                   const { navigation } = this.props;
                   const displayHeader = { BackBtn: true, MenuBtn: false };
                   return (<Container>
                       <HeaderComponent displayHeader={displayHeader} navigation={navigation} />
                       <Content padder>
                         <Text>Feedback</Text>
                       </Content>
                       <FooterComponent navigation={navigation} />
                   </Container>);
      }
 }
