import React, {Component} from 'react';
import { TouchableWithoutFeedback,FlatList,AsyncStorage } from 'react-native'
import {Card, CardItem, Badge, Text, Left, Body, View, Right } from 'native-base';
import moment from 'moment';
export class MyBody extends Component {
  render () {
    return (
      <View>
        <FlatList
           data={this.props.customers}
           keyExtractor={(item, index) => item._id}
           initialNumToRender={30}
           renderItem={this._renderItem}
          //  getItemLayout={(outfits, index) => (
          //     { length: 40, offset: 40 * index, index }
          //  )}
          onEndReached={this.onEndReact}
          onEndReachedThreshold={20}
           />
      </View>
    );
  }
  _renderItem = ({item}) => (
    <MyComponent item={item} {...this.props}/>
  );

  onEndReached =()=>{
    console.log('reached end');
  }

}

export default MyBody;

const MyComponent = (props)=>{
  return(
    <CardItem>
       <TouchableWithoutFeedback  onPress={()=>props.navigation.navigate('Customer')}>
      <Left>
         <Badge success>
            <Text>{props.item.customerName[0]}</Text>
          </Badge>
        <Body>
          <Text>{props.item.customerName}</Text>
          <Text note>{moment(props.item.createdAt).fromNow()}</Text>
        </Body>
      </Left>
        </TouchableWithoutFeedback>
      <Right>
         <Badge success >
            <Text onPress={()=>{
              AsyncStorage.removeItem('shopId',(err)=>{
               // props.navigation.navigate('Login',{logout:true})
                props.navigation.navigate('Invoice')
              })
            }}>Billing</Text>
        </Badge>
      </Right>
    </CardItem>
  )
}