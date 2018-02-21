import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Fonts } from "../utils/Fonts";
import Slider from "react-native-slider";
export default class LightingSlider extends Component {
  state = {
      minimumValue:1
  };
  render() {
    return <View style={styles.sliderContainer}>
        <Slider trackStyle={styles.track} thumbStyle={styles.thumb} minimumTrackTintColor="#e6a954" minimumValue={this.state.minimumValue} maximumValue={100} />
        <View style={styles.sliderText}>
          <Text style={styles.textFont}>OFF</Text>
          <Text style={styles.textFont}>LOW</Text>
          <Text style={styles.textFont}>MEDIUM</Text>
          <Text style={styles.textFont}>HIGH</Text>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    display: "flex",
    flexDirection: 'column',
    padding: 20
  },
  sliderText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  textFont: {
    fontFamily: Fonts.MontSerratBold,
    color: "#5a5a5c"
  },
  track: {
    height: 40,
    borderRadius: 40,
    backgroundColor: "white",
    borderColor: "#9a9a9a",
    borderWidth: 1,
    flex: 1
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderColor: "#9a9a9a",
    borderWidth: 1
  }
});
