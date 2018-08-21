import React, {Component} from 'react';
import {Header, Item, Input, Icon, Button, Text, View,Body,Left,Right} from 'native-base';
export class MyHeader extends Component {
    state = {
        headerState: 1,
      };
  render () {
    
    return (
        <Header style={{backgroundColor: '#4CAF50'}}>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{fontFamily: 'Dosis-Bold'}}>Header1</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}

export default Header;

styles={
    header:{backgroundColor: '#4CAF50'}
}
