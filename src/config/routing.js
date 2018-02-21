import React from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import Zones from "../pages/Zones";
import Lighting from "../pages/Lighting";
import Location from "../pages/Location";
import Temperature from "../pages/Temperature";
import Feedback from "../pages/Feedback";
import Learning from "../pages/Learning";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TabNavigator, TabBarBottom } from "react-navigation";

const RootStack = StackNavigator(
  {
    Zones: {
      screen: Zones
    },
    Location: {
      screen: Location
    },
    Lighting: {
      screen: Lighting
    },
    Temperature: {
      screen: Temperature
    },
    Feedback: {
      screen: Feedback
    },
    Learning: {
      screen: Learning
    }
  },
  {
    initialRouteName: "Temperature",
    navigationOptions: {
      header: null
    }
  }
);

export default RootStack;

// Zones
// Location
// Lighting
// Temperature
// Feedback
// Learning