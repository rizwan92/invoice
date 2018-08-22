import React, {Component} from 'react';
import {AsyncStorage,ScrollView, ActivityIndicator,Keyboard} from 'react-native'
import {Toast,Container, Content, Text,View,Button,Input,Item} from 'native-base';
import Meteor from 'react-native-meteor';
export default class LoginLayout extends Component {
  constructor(props){
    super(props)
    this.state ={
      email:'ajmeri@gmail.com',
      password:'ajmeri',
      loading:false,
    }
    this.inputs={}
    this.focusNextField = this.focusNextField.bind(this);
  }

  focusNextField(id) {
    this.inputs[id].wrappedInstance.focus();
  }

  onChangeText = (text,id) =>{
    this.setState({[id]:text})
  }
  makeToast=(msg)=>{
    Toast.show({
      text: msg,
      textStyle: { color: "yellow" },
    })  
   }

  handleLogin = ()=> {
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    if (email === '') {this.makeToast('Enater Email');return false;}
    if (password === '') {this.makeToast('Enter Password');return false;}

    this.setState({loading:true},()=>{
      Meteor.call('shop.login',email,password,(err,res)=>{
        if (err) {
          this.makeToast(err.message)
          this.setState({loading:false})
          return
        }else {
          AsyncStorage.setItem('shopId',res.result._id);
          const logout = this.props.navigation.getParam('logout');
          if (logout) {
            this.props.navigation.navigate('Home');
          }else{
            this.props.navigation.navigate('App');
          }
        }
      })
    })
  }



 
 
  render () {
    return (
      <Container>
        <Content >
        <View style={{marginTop:22}}>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <Button transparent
           onPress={()=>this.props.navigation.navigate('RegistrationLayout')}
            style={{borderWidth:1,borderColor:'#4CAF50',marginRight:5,marginBottom:10,borderRadius:5}} >
            <Text style={{color:'#4CAF50'}}>Registere</Text>
          </Button>
          </View>
           <ScrollView keyboardShouldPersistTaps="never">
              <Item style={{borderBottomColor:'#4CAF50'}}>
                <Input 
                 onChangeText={(text) => this.onChangeText(text,'email')}
                 value={this.state.email}
                 keyboardType="email-address"
                 ref={ input => {this.inputs['email'] = input;}}
                 onSubmitEditing={() => {this.focusNextField('password');}}
                 placeholder='Email'
                 blurOnSubmit={false}
                 />
              </Item>

              <Item style={{borderBottomColor:'#4CAF50'}}>
                <Input 
                 onChangeText={(text) => this.onChangeText(text,'password')}
                 value={this.state.password}
                 ref={ input => {this.inputs['password'] = input;}}
                 onSubmitEditing={() => Keyboard.dismiss}
                 placeholder='Password'
                 returnKeyType="done"
                 secureTextEntry={true}
                 />
              </Item>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:22}}>
                <Button transparent  onPress={() => this.handleLogin()} 
                  style={{borderWidth:1,borderColor:'#4CAF50',margin:5,borderRadius:5,width:80,display:'flex',justifyContent:'center',alignItems:'center'}} >
                  {
                    this.state.loading ? 
                  <ActivityIndicator size="small" color="#00ff00" />
                   :
                  <Text style={{color:'#4CAF50'}}>Login</Text>
                  }
                </Button>
                </View>
               </ScrollView> 
            </View>
        </Content>
      </Container>
    );
  }
}
