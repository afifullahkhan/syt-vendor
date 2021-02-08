import {Text, View} from 'native-base';
import React from 'react';
import {Header} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
function Header1(props) {
  const {navigation} = props;
  return (
    <Header
      backgroundColor="transparent"
      leftComponent={
        <View style={{paddingLeft: 10}}>
          {props.type == 'back' ? (
            <Icon1
              name="arrow-back"
              color="#000"
              size={30}
              onPress={props.onPress}
            />
          ) : (
            <Icon name="menu" color="#000" size={30} onPress={props.onPress} />
          )}
        </View>
      }
      centerComponent={
        <View>
          <Text style={{fontSize: 18, fontFamily: 'Montserrat-SemiBold'}}>
            {props.title}
          </Text>
        </View>
      }
    />
  );
}

export default Header1;
