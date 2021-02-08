import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';

function Splash({navigation, navigateTo = 'Home'}) {
  // setTimeout(() => {
  //   navigation.navigate(navigateTo);
  // }, 500);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: 250, height: 250}}
      />
      <ActivityIndicator size="large" color="#780B0E" style={{margin: -5}} />
    </View>
  );
}

export default Splash;
