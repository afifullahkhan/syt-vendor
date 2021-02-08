import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
const RootStack = createStackNavigator();

const DetailsStack = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Details">
    <RootStack.Screen name="Details" component={DetailsScreen} />
  </RootStack.Navigator>
);

export default DetailsStack;
