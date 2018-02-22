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
import SpinnerComponent from '../common/spinner';
import { Dropdown } from "react-native-material-dropdown";
export default class Feedback extends React.Component {
                 state = { temperature: {}, zone: "Sora", loader: true };

                 componentDidMount() {
                  this._interval = setInterval(() => {
                    this.getTemeratureRecords();
                  }, 5000);
                  
                 }
                 componentWillUnmount() {
                  clearInterval(this._interval);
                }

                 getTemeratureRecords() {
                   let url = endPoints.AWS + "temperature?zone_id=1001";
                  fetch(url)
                     .then(response => response.json())
                     .then(result => {
                       this.setState({
                         temperature: result,
                         loader: false
                       })
                      }
                     ); 
                 }

                 updateCurrentTemperature(coolAbove, heatBelow, zone_id) {
                   console.warn(coolAbove);
                   console.warn(heatBelow);
                   let url = endPoints.AWS + "temperature?zone_id=" + zone_id;
                   putData(url, {
                    "cool_above": coolAbove,
                    "heat_below": heatBelow
                   })
                     .then(data => {
                       console.warn(data)
                       this.getTemeratureRecords();
                     }) 
                     .catch(error => console.error(error));
                 }
                // Warm my place  -> set heating point to currentTemperature - 15 F
                // This method is used to warm the place
                 warmMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                  let coolAboveTemperature = temperature.cool_above ;
                  // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let heatBelowTemperature = temperature.room_temperature - 15;  
                  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature,zone_id);
                   }
                // This method is used to cool the place
                // Cool my place  -> set heating point to currentTemperature + 15 F
                 coolMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                   // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let coolAboveTemperature = temperature.cool_above ;
                  let heatBelowTemperature = temperature.room_temperature + 15;  
                  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature, zone_id);
                 }
                 changeZone(text) {
                   this.getTemeratureRecords();
                 }
                 render() {
                   const { navigation } = this.props;
                   const displayHeader = { BackBtn: false, MenuBtn: false };
                   let data = [{ value: "Sora" }, { value: "Kira" }, { value: "Exec Office" }, { value: "Office" }];
                   if (this.state.loader) {
                     return <SpinnerComponent/>;
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
                                  parseInt(this.state.temperature.room_temperature)
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
                             <Button block light style={styles.buttonIncrement} onPress={() => this.warmMyPlace()}>
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
                             <Button block success style={styles.buttonDecrement} onPress={() => this.coolMyPlace()}>
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
