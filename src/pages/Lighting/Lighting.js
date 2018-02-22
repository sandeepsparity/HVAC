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
import { Fonts } from "../../utils/Fonts";
//import  LightingSlider from '../../components/LightingSlider';
import HeaderComponent from "../../headerComponent";
import FooterComponent from "../../footer";
export default class Lighting extends Component {
    state = {  }
    render() {
         const { navigation } = this.props;
         const displayHeader = { BackBtn: true, MenuBtn: false };
          return <Container>
              <HeaderComponent displayHeader={displayHeader} navigation={navigation} />
              <Content padder>
                <View>
                 
                </View>
              </Content>
              <FooterComponent navigation={navigation} />
            </Container>;
    }
}

const styles = StyleSheet.create({
  textFont: {
    fontFamily: Fonts.MontSerratBold
  }
});