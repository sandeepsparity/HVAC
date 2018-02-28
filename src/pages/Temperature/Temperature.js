import React, { Component } from "react";
import { StyleSheet,  View, TouchableOpacity} from "react-native";
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
  Toast,
  Text
} from "native-base";
import { Crashlytics, Answers } from 'react-native-fabric'; //Add Answers
import styles from './style'
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
    this.callbackForSelectedZone = this.callbackForSelectedZone.bind(this);
    this.warmMyPlace = this.warmMyPlace.bind(this);
    // TODO userSelectedZoneName -> Hardcoded zoneName : which need to take from backend API
    // Not yet done in backend
    this.state = { 
      temperature: {},
      zones:[],
      loader: true, 
      howToast: false, 
      isDisabled: false,
      btnOpacity: 1 
    };
    }   
       componentDidMount() {
                 /* this._interval = setInterval(() => {
                    this.getTemperatureRecords();
                  }, 5000); */
                  this.getTemperatureRecords();
                 //simulates a crash after 5 seconds
                   
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
                callbackForSelectedZone(userSelectedZoneParameters){
                  this.setState({
                    temperature : userSelectedZoneParameters
                  })
                 
                }

                getTemperatureRecords() {
                   let url = endPoints.AWS + "zones";
                  fetch(url)
                     .then(response => response.json())
                     .then(result => {
                       this.setState({
                         zones: result.zones,
                         temperature: result.zones[0], 
                         loader: false
                       })
                      }).catch(error => ToastMessage(Toast, error ));
                 }

                 getCurrentUpdatedTemperature(zone_id){
                  let url = endPoints.AWS + "zone/" + zone_id;
                  fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    this.setState({
                      temperature: result.zone
                    })
                   }).catch(error => ToastMessage(Toast, error ));
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
                // Warm my place  -> set heating point to currentTemperature - 15 F
                // This method is used to warm the place
                warmMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                  let coolAboveTemperature = parseInt(temperature.cool_above) ;
                  // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let heatBelowTemperature = parseInt(temperature.heat_below) - 1; 
                  this.setState({isDisabled: true});
                  setTimeout(() => {
                    this.setState({isDisabled: false});
                  }, 1000);
                //  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature,zone_id);
                   }
                // reset temperature 
                 resetTemperature(){
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                   // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let coolAboveTemperature = parseInt(temperature.room_temperature) + 1;
                  let heatBelowTemperature = parseInt(temperature.room_temperature) - 1; 
                  this.setState({isDisabled: true});
                //  this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature, zone_id);
                 }
               
                // This method is used to cool the place
                // Cool my place  -> set heating point to currentTemperature + 15 F
                 coolMyPlace() {
                  let temperature = this.state.temperature;
                  let zone_id = temperature.zone_id
                   // heatBelowTemperature = (room_temperature) Current Temperature - 15 
                  let coolAboveTemperature = parseInt(temperature.cool_above) + 1 ;
                  let heatBelowTemperature = parseInt(temperature.heat_below) ; 
                  this.setState({isDisabled: true});
                 // this.updateCurrentTemperature(coolAboveTemperature, heatBelowTemperature, zone_id);
                 }
                 
                 setButtonProperties(backgroundColor){
                   let bgColor  = backgroundColor === 'Primary' ?
                                      'rgb(241, 101, 39)' : 
                                      (backgroundColor === 'Secondary') ? '#b1b5b8': 'rgb(106, 194, 191)';
                 return ({ 
                          marginBottom: 15,
                          backgroundColor: bgColor,
                          marginLeft: 20,
                          marginRight: 20,
                          height: 60 })
                 }
                 displayStatusMessage(){
                    return (<TouchableOpacity>
                      <Button 
                      block 
                      success>
                        <Text style={styles.processingRequest}>
                        Please wait while we're processing your request...
                        </Text>
                      </Button>
                    </TouchableOpacity>)
                 }

                 render() {
                   
                   const { navigation } = this.props;
                   const displayHeader = { BackBtn: false, MenuBtn: true };
                   const { loader , showToast, isDisabled, temperature} = this.state;
                   if (this.state.loader) {
                     return <SpinnerComponent/>;
                   }
                   setTimeout(()=>{
                    this.getCurrentUpdatedTemperature(temperature.zone_id)
                   }, 3600)
                   let opacity = isDisabled ?  {'opacity' : 0.6} : {'opacity' : 1};
                   let displayStatus = isDisabled ? this.displayStatusMessage() : null;

                   // Toast
                   return (
                    <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar 
                      navigation={navigation}
                    closeDrawer = {this.closeDrawer}
                    temperature={this.state.zones}
                    callbackForSelectedZone = {this.callbackForSelectedZone}/>}
                    onClose={() => this.closeDrawer()} >
                   <Container>
                       <HeaderComponent displayHeader={displayHeader} navigation={navigation}  openDrawer = {this.openDrawer}/>
                       <Content padder style={styles.content}>
                         <View>
                          <Text style={styles.centerAlign}>User Picked Zone : </Text>
                          <H3 style={styles.centerAlign}>{temperature.zone_name} </H3>
                           <View style={styles.temperatureWrapper}>
                             <Text style={styles.temperatureLabel}>
                               <Text style={styles.temp}>
                                 {
                                  parseInt(temperature.room_temperature)
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
                             <Button block light style={styles.temperatureBtn} 
                             onPress={() => navigation.navigate("Lighting")}>
                               <Text style={styles.textColor}>
                                 COOLING
                               </Text>
                             </Button>
                           </View>
                         </View>
                         <View>

                           <View style={opacity}>
                             <Button block light 
                             style={this.setButtonProperties('Primary')}
                             onPress={() => this.warmMyPlace()}
                              >
                               <Text style={styles.textFont}>
                                 WARM MY PLACE
                               </Text>
                             </Button>
                           </View>
                           <View style={opacity}>
                             <Button block 
                             style={this.setButtonProperties('Secondary')}
                             onPress={() => this.resetTemperature()}
                             >
                               <Text style={styles.textFont}>
                                 I'M COMFY
                               </Text>
                             </Button>
                           </View>
                           <View style={opacity}>
                             <Button 
                             block 
                             success
                              style={this.setButtonProperties('Cool')}
                               onPress={() => this.coolMyPlace()}
                               >
                               <Text style={styles.textFont}>
                                 COOL MY PLACE
                               </Text>
                             </Button>
                           </View>
                         </View>
                        
                  
                       </Content>
                       {/*  This one will display if api request is in processing state */}
                       { displayStatus}
                                </Container>
                                <FooterComponent navigation={navigation} />
                                </Drawer>
                                );
                 }
               }
