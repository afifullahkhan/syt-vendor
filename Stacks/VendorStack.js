import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Plan from '../screens/plans';
import Menu from '../screens/menus';
import Createplan from '../screens/createplan';
import Createmenu from '../screens/createmenu';
import Reviews from '../screens/reviews';
import Support from '../screens/support';
import Splash from '../screens/splash';
import Settings from '../screens/settings';
import Order from '../screens/orders';
import Orderstatus from '../screens/orderstatus';
import Payment from '../screens/payment';
import OrderDetails from '../screens/orderdetails';
import Allreport from '../screens/Allreport';
import Editinfo from '../screens/Editinfo'
const RootStack = createStackNavigator();

const VendorStack = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home">
    <RootStack.Screen name="Home" component={Home} />
    <RootStack.Screen name="Menu" component={Menu} />
    <RootStack.Screen name="Plan" component={Plan} />
    <RootStack.Screen name="Orders" component={Order} />
    <RootStack.Screen name="Reviews" component={Reviews} />
    <RootStack.Screen name="Support" component={Support} />
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

export default VendorStack;
