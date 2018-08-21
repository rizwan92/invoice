import React, {Component} from 'react';
import { Modal,ToastAndroid } from 'react-native'
import {Toast,Container, Content, Text,Left,Right,Header,Icon,View,Button,Body,Title,Fab,Card,CardItem,Badge,Input,Item} from 'native-base';
import uuid from "uuid-v4";
export default class InvoiceLayout extends Component {

  state={
    headerState:true,
    modalVisible: false,
    product:{},
    products:[],
    showToast: false
  }
  makeToast=(msg)=>{
    Toast.show({
      text: msg,
      textStyle: { color: "yellow" },
      buttonText: "Okay"
    })   
  }
  setModalVisible=(visible)=> {
    this.setState({modalVisible: visible});
  }
  addProduct=(product)=>{
    let products = this.state.products
    this.setState({products:[product,...products]})
  }
  editProduct=(product)=>{
    console.log(product);
    let products = this.state.products
    const index = products.findIndex(x => x.productId === product.productId);
    products[index] = product
    this.setState({products,product:{}})
  }
  startEdit=(product)=>{
    this.setState({product,modalVisible:true})
  }
  render () {
    let total = this.state.products.reduce((sum,product)=>sum + parseFloat(product.amount),0)
    return (
        <Container>
        <Header noLeft style={{backgroundColor: '#4CAF50',elevation:5}}>
          <Left>
            <Button transparent onPress={()=> this.makeToast("Something")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Total: {total}</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=> this.makeToast("Something")}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          {
            this.state.products.map((product,i)=>{
              return(
                <ProductBox key={i} product={product} startEdit={this.startEdit}/>
              )
            })
          }
        { this.state.modalVisible ?  <MyModal editProduct={this.editProduct} addProduct={this.addProduct} product={this.state.product} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} /> : null }
        </Content>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#4CAF50' }}
            position="bottomRight"
            onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
            <Icon name="add" />
          </Fab>
     </Container>
    );
  }
}

 class MyModal extends Component {
   constructor(props){
     super(props)
     this.state={
       description:'',
       price:'',
       quantity:'',
       tax:'',
       amount: 0,
     }
    this.inputs = {};
   }

   focusNextField(id) {
    this.inputs[id].wrappedInstance.focus();
  }

   onChangeText = (text,id) =>{
    let amount = this.state.amount === "" ? 0 : parseFloat(this.state.amount).toFixed(2);
    let quantity  = this.state.quantity === "" ? 1 : parseFloat(this.state.quantity).toFixed(2);
    let price = this.state.price === "" ? 0 : parseFloat(this.state.price).toFixed(2);
    let tax = this.state.tax === "" ? 0 : parseFloat(this.state.tax).toFixed(2);
    if (id === "price") {
      amount =
        parseFloat(quantity).toFixed(2) *
        parseFloat(text === "" ? 0 : text).toFixed(2);
      let textamount = (amount * parseFloat(tax)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
      this.setState({ [id]: text, amount });
    }
    if (id === "quantity") {
      amount =
        parseFloat(price).toFixed(2) *
        parseFloat(text === "" ? 0 : text).toFixed(2);
      let textamount = (amount * parseFloat(tax)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
      this.setState({ [id]: text, amount });
    }
    if (id === "tax") {
      amount = parseFloat(price).toFixed(2) * parseFloat(quantity).toFixed(2);
      let textamount =
        (amount * parseFloat(text === "" ? 0 : text)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
      this.setState({ [id]: text, amount });
    }
    if (id === 'description') {
      amount = parseFloat(price).toFixed(2) * parseFloat(quantity).toFixed(2);
      let textamount =
        (amount * parseFloat(text === "" ? 0 : text)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
      this.setState({ [id]: text});
    }
  }

     makeToast=(msg)=>{
      ToastAndroid.show(msg, ToastAndroid.SHORT);
     }

   handleEdit=()=>{
    const description = this.state.description.trim()
    if (description === '') {this.makeToast('Enter Desciption');return;}
    const price = this.state.price === '' ? 0 : parseFloat(this.state.price) 
    if (price == '' || price == 0 || price === 'NaN') {this.makeToast('Enter Price');return;}
    const quantity = this.state.quantity === '' ? 1 : parseFloat(this.state.quantity)
    if (quantity === '' || quantity === 0) {this.makeToast('Quantity must be atleast 1');return;}
    const tax = this.state.tax === '' ? 0 : parseFloat(this.state.tax)
    if (tax === '') {tax=0}
    const amount = parseFloat(this.state.amount)
    const productId = uuid();
    if (amount === '' || amount === 0) {this.makeToast('Enter Amount');return;}


    const product = {
      productId,description,price,quantity,tax,amount
     }
     this.props.editProduct(product)
     this.setState({
       description: "",
       quantity: "",
       price: "",
       tax: "",
       amount: 0
     });
     this.props.setModalVisible(false)
   }
   componentDidMount = () => {
     if(this.props.product.productId){
      this.setState({
        description:this.props.product.description.toString(),
        quantity:this.props.product.quantity.toString(),
        price:this.props.product.price.toString(),
        tax:this.props.product.tax.toString(),
        amount:this.props.product.amount.toString()
      });
     }
   }
   
   handleSubmit=()=>{
     const description = this.state.description.trim()
     if (description === '') {this.makeToast('Enter Desciption');return;}
     const price = this.state.price === '' ? 0 : parseFloat(this.state.price) 
     if (price == '' || price == 0 || price === 'NaN') {this.makeToast('Enter Price');return;}
     const quantity = this.state.quantity === '' ? 1 : parseFloat(this.state.quantity)
     if (quantity === '' || quantity === 0) {this.makeToast('Quantity must be atleast 1');return;}
     const tax = this.state.tax === '' ? 0 : parseFloat(this.state.tax)
     if (tax === '') {tax=0}
     const amount = parseFloat(this.state.amount)
     const productId = uuid();
     if (amount === '' || amount === 0) {this.makeToast('Enter Amount');return;}
     
     const product = {
      productId,description,price,quantity,tax,amount
     }
    this.props.addProduct(product)
    this.setState({
      description: "",
      quantity: "",
      price: "",
      tax: "",
      amount: 0
    });
    this.props.setModalVisible(false)
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
                 onChangeText={(text) => this.onChangeText(text,'description')}
                 value={this.state.description}
                 keyboardType="default"
                 ref={ input => {this.inputs['description'] = input;}}
                 onSubmitEditing={() => {this.focusNextField('price');}}
                 placeholder='Description'
                 blurOnSubmit={false}
                 autoFocus/>
              </Item>

              <Item style={{borderBottomColor:'#4CAF50'}}>
                <Input 
                 onChangeText={(text) => this.onChangeText(text,'price')}
                 value={this.state.price}
                 keyboardType="numeric"
                 ref={ input => {this.inputs['price'] = input;}}
                 onSubmitEditing={() => {this.focusNextField('quantity');}}
                 blurOnSubmit={false}
                 placeholder='Price'/>
              </Item>

              <Item style={{borderBottomColor:'#4CAF50'}}>
                <Input 
                 onChangeText={(text) => this.onChangeText(text,'quantity')}
                 value={this.state.quantity}
                 keyboardType="numeric"
                 ref={ input => {this.inputs['quantity'] = input;}}
                 onSubmitEditing={() => {this.focusNextField('tax');}}
                 blurOnSubmit={false}
                 placeholder='Quantity'/>
              </Item>

              <Item style={{borderBottomColor:'#4CAF50'}}>
                <Input 
                 onChangeText={(text) => this.onChangeText(text,'tax')}
                 value={this.state.tax}
                 keyboardType="numeric"
                 ref={ input => {this.inputs['tax'] = input;}}
                 placeholder='Tax'/>
              </Item>

              <Item style={{borderBottomColor:'#4CAF50'}}>
               {this.props.product.productId ?
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




const ProductBox = (props)=>{
  return(
      <Card>
      <CardItem>
        <Left>
          <Body>
            <Text style={{color:'#4CAF50'}} onPress={()=> props.startEdit(props.product)}>{props.product.description}</Text>
            <Text note>Price:-{props.product.price}</Text>
            <Text note>Quantity:-{props.product.quantity}</Text>
            <Text note>Tax:-{props.product.tax}</Text>
          </Body>
        </Left>
        <Right>
         <Text>Amount</Text>
         <Badge success>
            <Text>{props.product.amount}</Text>
          </Badge>
        </Right>
      </CardItem>
    </Card>
  )
}
