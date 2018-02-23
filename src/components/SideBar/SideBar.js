import React from "react";
import { StyleSheet,AppRegistry } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Chat", "Profile"];
const zoneslist = [
    {
        cool_above: 76,
        zone_id: "1001",
        hvac_status: "heating",
        room_temperature: 75,
        temperature_scale: "F",
        heat_below: 73,
        pressure: 3.95,
        zoneName:'Sora'
        },
        {
            cool_above: 74,
            zone_id: "1001",
            hvac_status: "heating",
            room_temperature: 79,
            temperature_scale: "F",
            heat_below: 73,
            pressure: 3.95,
            zoneName:'Kira Office'
            },
            {
                cool_above: 72,
                zone_id: "1001",
                hvac_status: "heating",
                room_temperature: 60,
                temperature_scale: "F",
                heat_below: 73,
                pressure: 3.95,
                zoneName:'Ex Office Testing'
                }
]
export default class SideBar extends React.Component {
    closeDrawer(userSelectedZoneParameters){
        this.props.closeDrawer();
        this.props.temperatureData(userSelectedZoneParameters);
    }
  render() {
      zoneslist[0] = this.props.temperature;
      zoneslist[0].zoneName = 'Sora';
    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={zoneslist}
            renderRow={zone => {
              return (
                <ListItem
                  button
                  onPress={() => this.closeDrawer(zone)}>
                  <Text>{zone.zoneName}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FAFAFA",
    paddingTop:70
    }
})

