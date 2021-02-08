import React from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Item, Input, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../components/buttonform';

function Forgot({navigation}) {
  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={Style.imgbg}>
      <Icon
        name="md-arrow-back"
        size={30}
        color="#780B0E"
        onPress={() => navigation.navigate('Login')}
        style={Style.back}
      />
      <View style={{flex: 1, top: -75}}>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/logo.png')} style={Style.logo} />
        </View>
        <View style={Style.container}>
          <Text style={{textAlign: 'center', color: 'white', bottom: 10}}>
            If you forgot your password so send us your email addresso username
            we will send you your password
          </Text>
          <Item rounded style={Style.text}>
            <Icon active name="mail-outline" size={20} style={Style.icons} />
            <Input placeholder="Username or Email" style={Style.inputtext} />
          </Item>
          <View style={Style.buttons}>
            <Button
              isTrue="1"
              title="Send Email"
              onPress={() => {
                alert('Check Your Email');
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const Style = StyleSheet.create({
  back: {
    margin: 18,
  },
  logo: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    top: 100,
  },
  imgbg: {
    width: '100%',
    height: '100%',
  },
  text: {
    width: '90%',
    margin: 5,
    padding: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    height: 50,
  },
  icons: {
    paddingLeft: 10,
  },
  inputtext: {
    fontSize: 15,
  },
  links: {
    alignItems: 'flex-end',
    position: 'relative',
    width: '90%',
    top: 90,
    flex: 1,
  },
  forgot: {
    color: 'white',
    fontSize: 14,
  },
  buttons: {
    alignItems: 'center',
    position: 'relative',
    top: 20,
  },
});

export default Forgot;
