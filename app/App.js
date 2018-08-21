
import React, {Component} from 'react';
import Home from './screens/home'
import Invoice from './screens/invoice';
import Search from './screens/search';
import Customer from './screens/customer';
import Login from './screens/login';
import Registration from './screens/registration'
import { Root, View, Text} from "native-base";
import { createStackNavigator } from "react-navigation";
import Meteor from 'react-native-meteor';
import { AsyncStorage } from 'react-native'
import Loader from './components/Loader';
// Meteor.connect('ws://127.0.0.1:3000/websocket'); 
Meteor.connect('ws://192.168.43.165:3000/websocket'); 

const AppNavigator = (signedIn)=>{
  return createStackNavigator(
  {
    Home: { screen: Home,
      navigationOptions: {header:null},
     },
      Invoice: { screen: Invoice,
      navigationOptions: {header:null},
     },
    Search: { screen: Search,
      navigationOptions: {header:null},
     },
    Customer: { screen: Customer,
      navigationOptions: {header:null},
     },
    Login: { screen: Login,
      navigationOptions: {header:null},
     },
    Registration: { screen: Registration,
      navigationOptions: {},
     },
  },
  {
    mode: "modal",
    initialRouteName: signedIn ? "Home" : "Login"
  }
);
}

export default class App extends Component {
  state={
    connect:false,
    signedIn:false,
    shopId:''
  }
  componentDidMount = () => {
    Meteor.ddp.on('connected', () => {
      this.setState({connect:true})
    });
    Meteor.ddp.on('disconnected', () => {
      this.setState({connect:false}) 
    });
    AsyncStorage.getItem('shop_id', (err, result) => {
        if (result) {
        this.setState({signedIn:true,shopId:result})
      }else {
        this.setState({signedIn:false})
      }
    })
    
  }
  
   
  render() {
    if (!this.state.connect) {
      return  <Connect />
    }
    const MyLayout = AppNavigator(this.state.signedIn)
    if (!this.state.signedIn) {
      return(
        <Root>
         <MyLayout />
       </Root>
      )
    }else{
    return (
      <Root>
        {this.state.shopId === '' ? null : <MyLayout screenProps={{shopId:this.state.shopId}} />}
      </Root>
    );
   }
  }
}

const Connect = ()=>{
  return(
    <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text>Connecting</Text>
    </View>
  )
}

