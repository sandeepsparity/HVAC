import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";

export default class HeaderComponent extends React.Component {
                 // state = {};
                 
                 render() {
                   {
                     /* Router Name : Displaying Route Name on Header */
                   }
                   const titleName = this.props.navigation.state.routeName;
                   const { BackBtn, MenuBtn } = this.props.displayHeader;
                   {
                     /* Backbtn :  Hide or Show Backbtn - True or false */
                   }
                   const { goBack } = this.props.navigation;
                   const leftArrow = BackBtn ? <Button transparent>
                       <Icon name="arrow-back" onPress={() => this.props.navigation.goBack()} />
                     </Button> : null;
                   {
                     /* Hide or Show Menu Item - True or false */
                   }

                   const rightMenu = MenuBtn ? <Button transparent>
                       <Icon name="menu" />
                     </Button> : null;
                     

                   return <Header style={styles.header}>
                       <Left>
                         {leftArrow}
                       </Left>
                       <Body>
                         <Title>{titleName}</Title>
                       </Body>
                       <Right>{rightMenu}</Right>
                     </Header>;
                 }
               }
const styles = StyleSheet.create({
  header:{
    display: 'flex',
  }
});
