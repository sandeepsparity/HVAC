import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Drawer,
  H2,
  H3,
  Toast
} from "native-base";
import { Fonts } from '../../utils/Fonts';
import HeaderComponent from "../../headerComponent";
import FooterComponent from "../../footer";
import Lighting from "../Lighting/Lighting";
import { putData } from "../../common/httpRequest";
import {  endPoints } from "../../config/endPoints";
import SpinnerComponent from '../../common/spinner';
import SideBar from '../../components/SideBar/SideBar';
import { Dropdown } from "react-native-material-dropdown";
import { ToastMessage } from '../../common/toast';
export default class Temperature extends React.Component {
  constructor(props){
    super(props);
    this.temperatureData = this.temperatureData.bind(this);
    this.warmMyPlace = this.warmMyPlace.bind(this);
    // TODO userSelectedZoneName -> Hardcoded zoneName : which need to come to backend API
    this.state = { temperature: {},userSelectedZoneName: "Sora", loader: true, showToast: false };
    }   
       componentDidMount() {
                 /* this._interval = setInterval(() => {
                    this.getTemperatureRecords();
                  }, 5000); */
                  this.getTemperatureRecords();
                  
                 }
                 componentWillUnmount() {
                //  clearInterval(this._interval);
                }
                closeDrawer = () => {
                  this.drawer._root.close()
                };
                openDrawer = () => {
                  this.drawer._root.open()
                };
                temperatureData(userSelectedZoneParameters){
                  this.setState({
                    temperature : userSelectedZoneParameters,
                    userSelectedZoneName:userSelectedZoneParameters.zoneName 
                  })
                 
                }

                getTemperatureRecords() {
                   let url = endPoints.AWS + "temperature?zone_id=1001";
                  fetch(url)
                     .then(response => response.json())
                     .then(result => {
                       this.setState({
                         temperature: result,
                         loader: false
                       })
                      }).catch(error => ToastMessage(Toast, error ));; 
                 }

                 updateCurrentTemperature(coolAbove, heatBelow, zone_id) {
                   let url = endPoints.AWS + "temperature?zone_id=" + zone_id;
                   putData(url, {
                    "cool_above": coolAbove,
                    "heat_below": heatBelow
                   })
                     .then(data => {
                       ToastMessage(Toast, 'Success!');
                       this.getTemperatureRecords();
                     }) 
                     .catch(error =>  ToastMessage(Toast, error ));
                 }


                 resetTemperature(){
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                   // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let coolAboveTemperature = parseInt(temperature.room_temperature) + 1;
                  let heatBelowTemperature = parseInt(temperature.room_temperature) - 1;  
                  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature, zone_id);
                 }
                // Warm my place  -> set heating point to currentTemperature - 15 F
                // This method is used to warm the place
                 warmMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                  let coolAboveTemperature = parseInt(temperature.cool_above) ;
                  // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let heatBelowTemperature = parseInt(temperature.heat_below) - 1; 
                  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature,zone_id);
                   }
                // This method is used to cool the place
                // Cool my place  -> set heating point to currentTemperature + 15 F
                 coolMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                   // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let coolAboveTemperature = parseInt(temperature.cool_above) + 1 ;
                  let heatBelowTemperature = parseInt(temperature.heat_below) ;  
                  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature, zone_id);
                 }
                 render() {
                   const { navigation } = this.props;
                   const displayHeader = { BackBtn: false, MenuBtn: true };
                   const { loader , showToast} = this.state;
                   if (this.state.loader) {
                     return <SpinnerComponent/>;
                   }
                   
                   // Toast
                   return (
                    <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar 
                      navigation={navigation}
                    closeDrawer = {this.closeDrawer}
                    temperature={this.state.temperature}
                     temperatureData = {this.temperatureData}/>}
                    onClose={() => this.closeDrawer()} >
                   <Container>
                       <HeaderComponent displayHeader={displayHeader} navigation={navigation}  openDrawer = {this.openDrawer}/>
                       <Content padder style={styles.content}>
                         <View>
                          <H2 style={styles.centerAlign}>User Picked Zone : </H2>
                          <H3 style={styles.centerAlign}>{this.state.userSelectedZoneName}  </H3>
                           <View style={styles.temperatureWrapper}>
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
                             <Button block style={styles.buttonSecondary} onPress={() => this.resetTemperature()}>
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
                                </Container>
                                </Drawer>
                                );
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
  temperatureWrapper: {
    padding: 10,
    margin: 10,
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
  },
  centerAlign:{
    textAlign:'center',
    color:'#b1b5b8',
    fontFamily: Fonts.MontSerratBold
  }
});
