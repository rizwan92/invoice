import React, {Component} from 'react';
import {Container, Content, Text,Left,Right,Header,Icon,Item,Button,Body,Title,Input,Fab, View} from 'native-base';
import MyBody from '../../components/MyBody'
import Ficon from 'react-native-vector-icons/Feather';
import Meteor from 'react-native-meteor';

export default class SearchLayout extends Component {

  state ={
    searchText:'',
    customers:[]
  }

  onChangeText = (text,id) =>{
    if (text.length > 2) {
      Meteor.call('shopcustomer.bynames',this.props.screenProps.shopId,text,(err,res)=>{
        this.setState({customers:res})
      })
    }
    this.setState({ [id]: text});
  }
  
  render () {    
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#4CAF50',elevation:5}}>
            <Item>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
            <Ficon name="arrow-left" size={27} color="#000" style={{margin:5}}  />
            </Button>
              <Input 
                placeholder="Search" 
                onChangeText={(text) => this.onChangeText(text,'searchText')}
                value={this.state.searchText}
                keyboardType="default"
                autoFocus
                />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
        </Header>
        <Content >
        <MyBody customers={this.state.customers} navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}
