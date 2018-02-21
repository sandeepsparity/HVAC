import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import { Fonts } from '../utils/Fonts';
import HeaderComponent from "../headerComponent";
import FooterComponent from "../footer";
import Learning from "./Lighting";
import { putData } from "../common/httpRequest";
import {  endPoints } from "../config/endPoints";
import SpinnerComp from '../common/spinner';
import { Dropdown } from "react-native-material-dropdown";
export default class Feedback extends React.Component {
                 state = { humadity: {}, zone: "Sora", loader: true };

                 componentDidMount() {
                   this.getTemeratureRecords();
                 }

                 getTemeratureRecords() {
                   let humadity = { room_temperature: 75, 
                    temperature_scale: "F", heating_point: 73, cooling_point: 77, pressure: 2.37 };
                  fetch("https://jsonplaceholder.typicode.com/posts/1")
                     .then(response => response.json())
                     .then(data =>
                       this.setState({
                         humadity: humadity,
                         loader: false
                       })
                     ); 
                 }

                 updateCurrentTemperature(humadity, tenantId, roomId) {
                   let url = endPoints.AWS + "temperature?tenantId=" + tenantId + "&roomId=" + roomId;
                   putData(url, {
                     temperature: humadity,
                     temperatureScale: "F"
                   })
                     .then(data => {
                       console.warn(data);
                       this.getTemeratureRecords();
                     }) // JSON from `response.json()` call
                     .catch(error => console.error(error));
                 }

                 increaseTemperature() {
                   let new_room_temperature = this.state.cooling_point + 15;
                   this.updateCurrentTemperature(new_room_temperature);
                   console.warn(this.state.heating_point + 15);
                 }
                 decrementTemperature() {
                   let new_room_temperature = this.state.cooling_point - 15;
                   this.updateCurrentTemperature(new_room_temperature);
                 }
                 changeZone(text) {
                   this.getTemeratureRecords();
                 }
                 render() {
                   const { navigation } = this.props;
                   const displayHeader = { BackBtn: true, MenuBtn: false };
                   let data = [{ value: "Sora" }, { value: "Kira" }, { value: "Exec Office" }, { value: "Office" }];
                   if (this.state.loader) {
                     return <SpinnerComp />;
                   }

                   return <Container>
                       <HeaderComponent displayHeader={displayHeader} navigation={navigation} />
                       <Content padder style={styles.content}>
                         <View>
                           <Dropdown label="Select Zone" data={data} value={this.state.zone} padder onChangeText={zone => this.changeZone(zone)} />
                           <View style={styles.container}>
                             <Text style={styles.temperatureLabel}>
                               <Text style={styles.temp}>
                                 {
                                   this.state.humadity
                                     .room_temperature
                                 }
                               </Text>
                               <Text
                                 style={
                                   styles.temperatureLabelDeg
                                 }
                               >
                                 {" "}
                                 &#8457;
                               </Text>
                             </Text>
                             <Button block light style={styles.temperatureBtn} onPress={() => navigation.navigate("Lighting")}>
                               <Text style={styles.textColor}>
                                 COOLING
                               </Text>
                             </Button>
                           </View>
                         </View>
                         <View>
                           <TouchableOpacity>
                             <Button block light style={styles.buttonIncrement} onPress={() => this.increaseTemperature()}>
                               <Text style={styles.textFont}>
                                 WARM MY PLACE
                               </Text>
                             </Button>
                           </TouchableOpacity>
                           <TouchableOpacity>
                             <Button block style={styles.buttonSecondary}>
                               <Text style={styles.textFont}>
                                 I'M COMFY
                               </Text>
                             </Button>
                           </TouchableOpacity>
                           <TouchableOpacity>
                             <Button block success style={styles.buttonDecrement} onPress={() => this.decrementTemperature()}>
                               <Text style={styles.textFont}>
                                 COOL MY PLACE
                               </Text>
                             </Button>
                           </TouchableOpacity>
                         </View>
                       </Content>
                       <FooterComponent navigation={navigation} />
                     </Container>;
                 }
               }

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFFFFF"
  },
  feedbackButton: {
    margin: 10,
    fontFamily: Fonts.MontSerratBold
  },
  textFont: {
    fontFamily: Fonts.MontSerratBold,
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "black"
  },
  container: {
    padding: 20,
    margin: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderColor: "#d6d7da"
  },
  temperatureBtn: {
    flex: 1
  },
  temperatureLabel: {
    flex: 1,
    width: 100,
    textAlign: "right",
    justifyContent: "center",
    fontSize: 24,
    paddingRight: 30
  },
  temp: {
    fontSize: 40,
    color: "#b1b5b8"
  },
  temperatureLabelDeg: {
    /*flex:1,*/
    width: 100,
    height: 50,
    textAlign: "right",
    fontSize: 34,
    color: "rgb(106, 194, 191)"
  },
  textColor: {
    color: "rgb(106, 194, 191)",
    borderBottomWidth: 2,
    borderBottomColor: "black"
  },
  buttonIncrement: {
    marginBottom: 15,
    backgroundColor: "rgb(241, 101, 39)",
    marginLeft: 20,
    marginRight: 20,
    height: 60
  },
  buttonSecondary: {
    marginBottom: 15,
    backgroundColor: "#b1b5b8",
    marginLeft: 20,
    marginRight: 20,
    height: 60
  },
  buttonDecrement: {
    marginBottom: 15,
    backgroundColor: "rgb(106, 194, 191)",
    marginLeft: 20,
    marginRight: 20,
    height: 60
  }
});
