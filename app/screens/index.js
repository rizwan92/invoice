import React, {Component} from 'react';
import {Container, Content, Text,Left,Right,Header,Icon,Item,Button,Body,Title,Input,Fab, View} from 'native-base';
import MyBody from '../../components/MyBody'
import Ficon from 'react-native-vector-icons/FontAwesome';
export default class SearchLayout extends Component {
  
  render () {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#4CAF50',elevation:5}}>
            <Item>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
            <Ficon name="arrow-left" size={27} color="#000" style={{margin:5}}  />
            </Button>
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
        </Header>
        <Content >
           <MyBody />
        </Content>
      </Container>
    );
  }
}
