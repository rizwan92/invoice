import React, {Component} from 'react';
import { Modal,ToastAndroid } from 'react-native'
import {Toast,Container, Content, Text,Left,Right,Header,Icon,View,Button,Body,Title,Fab,Input,Item} from 'native-base';
import MyBody from '../../components/MyBody'
import HomeContainer from './HomeContainer'
import Meteor from 'react-native-meteor';

class MainLayout extends Component {

  state={
    active:false,
    modalVisible: false,
    customer:{},
  }

  setModalVisible=(visible)=> {
    this.setState({modalVisible: visible});
  }

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
            <Title style={{fontFamily: 'Dosis-Bold'}}>Relive</Title>
          </Body>
          <Right >
            <Button transparent onPress={()=>this.props.navigation.navigate('Search')}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
       
        <Content >
           <MyBody customers={this.props.customers} navigation={this.props.navigation} />
           { this.state.modalVisible ?  <MyModal shopId={this.props.shopId} customer={this.state.customer} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} /> : null }
        </Content>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#4CAF50' }}
            position="bottomRight"
            onPress={() => this.setModalVisible(true) }>
            <Icon name="add" />
          </Fab>
      </Container>
    );
  }
}
export default HomeContainer(MainLayout)


class MyModal extends Component {
  constructor(props){
    super(props)
    this.state={
     customerName:'',
     customerNumber:''
    }
   this.inputs = {};
  }

  focusNextField(id) {
   this.inputs[id].wrappedInstance.focus();
 }

  onChangeText = (text,id) =>{
     this.setState({ [id]: text});
 }

 makeToast=(msg)=>{
  ToastAndroid.show(msg, ToastAndroid.SHORT);
 }

  handleEdit=()=>{
    const customerName = this.state.customerName.trim()
    if (customerName === '') {this.makeToast('Enter Customer Name');return;}
    const customerNumber = this.state.customerNumber.trim()
    if (customerNumber === '') {this.makeToast('Enter Customer Number');return;}
    
   const customer = {customerName,customerNumber}   
   this.setState({customerName: "",customerNumber: ""});
   this.props.setModalVisible(false)
  }
  componentDidMount = () => {
    if(this.props.customer._id){
     this.setState({
       customerName:this.props.customer.customerName.toString(),
       customerNumber:this.props.customer.customerNumber.toString(),
     });
    }
  }
  
  handleSubmit=()=>{
    const customerName = this.state.customerName.trim()
    if (customerName === '') {this.makeToast('Enter Customer Name');return;}
    const customerNumber = this.state.customerNumber.trim()
    if (customerNumber === '') {this.makeToast('Enter Customer Number');return;} 
    const customer = {customerName,customerNumber,shopId:this.props.shopId}

    console.log(customer);

    Meteor.call('shopcustomer.insert',customer,(err,res)=>{
      if (err) {
        this.makeToast(err.message)
        return
      }else {
        this.makeToast('Successfully Added')
        this.setState({customerName: "",customerNumber: ""});
        this.props.setModalVisible(false)
      }
    })
  }

 render() {
   return (
     <Modal
       animationType="slide"
       transparent={false}
       visible={this.props.modalVisible}
       onRequestClose={() => {
         this.props.setModalVisible(false);
       }}>
     <View style={{marginTop:22}}>
         <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
         <Button transparent  onPress={() => {
           this.props.setModalVisible(false);
           }} style={{borderWidth:1,borderColor:'#4CAF50',margin:5,borderRadius:5}} >
           <Text style={{color:'#4CAF50'}}>Cancel</Text>
         </Button>
         </View>
         <View style={{padding:10,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
             
             <Item style={{borderBottomColor:'#4CAF50'}}>
               <Text>{this.state.amount}</Text>
             </Item>

             <Item style={{borderBottomColor:'#4CAF50'}}>
               <Input 
                onChangeText={(text) => this.onChangeText(text,'customerName')}
                value={this.state.customerName}
                keyboardType="default"
                ref={ input => {this.inputs['customerName'] = input;}}
                onSubmitEditing={() => {this.focusNextField('customerNumber');}}
                placeholder='Customer Name'
                blurOnSubmit={false}
                autoFocus
                />
             </Item>

             <Item style={{borderBottomColor:'#4CAF50'}}>
               <Input 
                onChangeText={(text) => this.onChangeText(text,'customerNumber')}
                value={this.state.customerNumber}
                keyboardType="numeric"
                ref={ input => {this.inputs['customerNumber'] = input;}}
                blurOnSubmit={false}
                placeholder='Customer Number'/>
             </Item>

             <Item style={{borderBottomColor:'#4CAF50'}}>
              {this.props.customer._id ?
               <Button transparent  onPress={() => this.handleEdit() } 
                 style={{borderWidth:1,borderColor:'#4CAF50',margin:5,borderRadius:5}} >
                 <Text style={{color:'#4CAF50'}}>Save</Text>
               </Button>
               :
               <Button transparent  onPress={() => this.handleSubmit() } 
                 style={{borderWidth:1,borderColor:'#4CAF50',margin:5,borderRadius:5}} >
                 <Text style={{color:'#4CAF50'}}>Done</Text>
               </Button>
               }
             </Item>
       </View>
     </View>
   </Modal>
   )
 }
}
