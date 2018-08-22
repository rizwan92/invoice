import { createSwitchNavigator } from "react-navigation";
import  App  from './App'
import Login from './screens/login';
import  AuthLoading  from "./AuthLoading";

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: App,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);