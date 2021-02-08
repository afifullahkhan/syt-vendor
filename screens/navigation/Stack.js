import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../home';
import Plan from '../plans';
import Menu from '../menus';
import Createplan from '../createplan';
import Createmenu from '../createmenu';
import Reviews from '../reviews';
import Support from '../support';
import Splash from '../splash';
import Login from '../login';
import Forgot from '../forgot';
import Settings from '../settings';
import Order from '../orders';
import Orderstatus from '../orderstatus';
import Payment from '../payment';
import OrderDetails from '../orderdetails';
import Allreport from '../Allreport';
import Editinfo from '../Editinfo';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Splash">
    <RootStack.Screen name="Splash" component={Splash} />
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Forgot" component={Forgot} />
    <RootStack.Screen name="Home" component={Home} />
    <RootStack.Screen name="Menu" component={Menu} />
    <RootStack.Screen name="Plan" component={Plan} />
    <RootStack.Screen name="Orders" component={Order} />
    <RootStack.Screen name="Reviews" component={Reviews} />
    <RootStack.Screen name="Support" component={Support} options={{headerShown: true}}/>
    <RootStack.Screen name="Payment" component={Payment} />
    <RootStack.Screen name="Settings" component={Settings} />
    <RootStack.Screen name="Allreport" component={Allreport} />
    <RootStack.Screen name="Orderstatus" component={Orderstatus} />
    <RootStack.Screen name="Createplan" component={Createplan} />
    <RootStack.Screen name="OrderDetails" component={OrderDetails} />
    <RootStack.Screen name="Createmenu" component={Createmenu} />
    <RootStack.Screen name="Editinfo" component={Editinfo} />
  </RootStack.Navigator>
);

export default RootStackScreen;
