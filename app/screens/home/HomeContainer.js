import React from 'react';
import Meteor,{ withTracker }  from 'react-native-meteor';
import Loader from '../../components/Loader';

export default function HomeContainerFunction (ComposedComponent) {
  class HomeContainer extends React.Component {
    render () {
        if (!this.props.loading) {
            return <Loader />
        }
      
      return <ComposedComponent {...this.props} shopId={this.props.screenProps.shopId}/>;
    }
  }
 
  return  withTracker(params => {  
     let  handle = Meteor.subscribe('allshopcustomer',params.screenProps.shopId); 
    return {
      loading: handle.ready(),
      customers: Meteor.collection('shopcustomers').find({},{sort: {createdAt: -1},limit:20}),
    };
  })(HomeContainer);
}



