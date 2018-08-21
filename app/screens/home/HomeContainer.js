import React from 'react';
import Meteor,{ withTracker }  from 'react-native-meteor';
import Loader from '../../components/Loader';

export default function HomeContainerFunction (ComposedComponent) {
  class HomeContainer extends React.Component {
    render () {
        if (!this.props.loading) {
            return <Loader />
        }
        let shopId =null 
        if (this.props.screenProps) {
          shopId = this.props.screenProps.shopId
        } else{
          shopId = this.props.navigation.getParam('shop_id','')
        }
      return <ComposedComponent {...this.props} shopId={shopId} />;
    }
  }
 
  return  withTracker(params => {
      let  handle = null;
      if (params.screenProps) {
           handle = Meteor.subscribe('allshopcustomer',params.screenProps.shopId); 
        }else{
            const shopId = params.navigation.getParam('shopId','');
           handle = Meteor.subscribe('allshopcustomer',shopId); 
         }
    return {
      loading: handle.ready(),
      customers: Meteor.collection('shopcustomers').find(),
    };
  })(HomeContainer);
}



