
import React, {Component} from 'react';
import Home from './screens/home'
import Invoice from './screens/invoice';
import Search from './screens/search';
import Customer from './screens/customer';
import Login from './screens/login';
import Registration from './screens/registration'
import { createStackNavigator } from "react-navigation";
import Loader from './components/Loader';
import { AsyncStorage } from 'react-native'
import { Root } from "native-base";


const  AppNavigator =  createStackNavigator(
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
  }
);



 export default class App extends Component {

  state = {
    shopId: ''
  }

  componentDidMount = () => {
    AsyncStorage.getItem('shopId', (err, result) => {
      if (result) {            
      this.setState({shopId:result})
    }else {
      this.props.navigation.navigate('Auth');
    }
  })
  };
  

  render() {
    if (this.state.shopId === '') {
      return(
        <Loader />
      ); 
    }    
    return (
      <Root>
      <AppNavigator screenProps={{shopId:this.state.shopId}} />
      </Root>
    )
   }
  }




