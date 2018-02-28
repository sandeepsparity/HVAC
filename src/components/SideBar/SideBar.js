import React from "react";
import { StyleSheet,AppRegistry } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
export default class SideBar extends React.Component {
    closeDrawer(userSelectedZoneParameters){
        this.props.closeDrawer();
        this.props.callbackForSelectedZone(userSelectedZoneParameters);
    }
  render() {
    let zoneslist = this.props.temperature;
    //To Do : need to get this name from backend

    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={this.props.temperature}
            renderRow={zone => {
              return (
                <ListItem
                  button
                  onPress={() => this.closeDrawer(zone)}>
                  <Text>{zone.zone_name}</Text>
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

