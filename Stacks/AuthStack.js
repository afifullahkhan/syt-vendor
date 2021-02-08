import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
const RootStack = createStackNavigator();

const AuthStack = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    <RootStack.Screen name="Login" component={Login} />
  </RootStack.Navigator>
);

export default AuthStack;
