import React, {StyleSheet} from 'react-native'
import { Fonts } from '../../utils/Fonts';
export default StyleSheet.create({
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
  centerAlign:{
    textAlign:'center',
    color:'#b1b5b8',
    fontFamily: Fonts.MontSerratBold
  },
  processingRequest:{
    fontSize:14
  }
});
