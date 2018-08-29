import React, { Component } from 'react'
import Meteor from 'react-native-meteor';
import { AsyncStorage } from 'react-native'
import Loader from './components/Loader';
import {  View, Text} from "native-base";

// Meteor.connect('ws://127.0.0.1:3000/websocket'); 
//Meteor.connect('ws://192.168.43.165:3000/websocket'); 
Meteor.connect('ws://192.168.1.11:3000/websocket'); 

export class AuthLoading extends Component {

    state = {
        connect: false,
        signedIn: false,
        shopId: ''
    }

    componentDidMount = () => {
        Meteor.ddp.on('connected', () => {
          this.setState({connect:true})
        });
        Meteor.ddp.on('disconnected', () => {
          this.setState({connect:false}) 
        });
        AsyncStorage.getItem('shopId', (err, result) => {          
            if (result) {                          
            this.props.navigation.navigate('App');
          }else {
            this.props.navigation.navigate('Auth');
          }
        })
      }
      
    render() {
        if (!this.state.connect) {
            return  <Connect />
          }
        return <Loader />
    }
}

export default AuthLoading

const Connect = ()=>{
    return(
      <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Connecting</Text>
      </View>
    )
  }