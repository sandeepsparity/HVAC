import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from "native-base";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {Learning, Location, Lighting, Feedback, Temperature} from './index';
import { StackNavigator } from "react-navigation";
import { Fonts } from "./utils/Fonts";

export default class FooterComponent extends Component {
                 constructor(props) {
                   super(props);
                 }

                 render() {
                   const {navigation} = this.props;
                   return <Footer>
                       <FooterTab>
                         <Button vertical onPress={() => navigation.navigate("Location")}>
                           <EvilIcons name="location" style={styles.footerIcon} />
                           <Text style={styles.footerText}>
                             Location
                           </Text>
                         </Button>
                         <Button vertical onPress={() => navigation.navigate("Lighting")}>
                           <FontAwesome name="lightbulb-o" style={styles.footerIcon} />
                           <Text style={styles.footerText}>
                             Lighting
                           </Text>
                         </Button>
                         <Button vertical onPress={() => navigation.navigate("Temperature")}>
                           <Icon active name="ios-thermometer-outline" style={styles.footerIcon} />
                           <Text
                             style={styles.temperatureFont}
                           >
                             Temperature
                           </Text>
                         </Button>
                         <Button vertical onPress={() => navigation.navigate("Feedback")}>
                           <Icon name="person" style={styles.footerIcon} />
                           <Text style={styles.footerText}>
                             Feedback
                           </Text>
                         </Button>
                         <Button vertical onPress={() => navigation.navigate("Learning")}>
                           <Icon name="person" style={styles.footerIcon} />
                           <Text style={styles.footerText}>
                             Learning
                           </Text>
                         </Button>
                       </FooterTab>
                     </Footer>;
                 }
               }

               const styles = StyleSheet.create({
                 footerText: {
                   fontSize: 8,
                   color: "grey",
                   fontFamily: Fonts.MontSerratBold
                 },
                 footerIcon: {
                   fontSize: 20,
                   color: "grey",
                   fontFamily: Fonts.MontSerratBold
                 },
                 temperatureFont: {
                   fontSize: 8,
                   paddingLeft: 7,
                   paddingRight: 7,
                   color: "grey",
                   fontFamily: Fonts.MontSerratBold
                 }
               });

