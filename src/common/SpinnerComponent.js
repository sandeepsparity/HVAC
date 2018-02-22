import React, { Component } from 'react';
import { StyleSheet} from "react-native";
import { Container, Header, Content, Spinner } from 'native-base';
export default class SpinnerComponent extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='red'/>
        </Content>
      </Container>
    );
  }
}
