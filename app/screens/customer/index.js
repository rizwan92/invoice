import React, {Component} from 'react';
import {Container, Content, Text,Left,Right,Header,Icon,Button,Body,Title,Fab} from 'native-base';
export default class MainLayout extends Component {
  render () {
    return (
      <Container>
       <Header style={{backgroundColor: '#4CAF50'}}>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{fontFamily: 'Dosis-Bold'}}>Customer Details</Title>
          </Body>
        </Header>
       
        <Content >
        </Content>
       
      </Container>
    );
  }
}
