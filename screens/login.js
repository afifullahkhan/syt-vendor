import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Item, Input, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Button from '../components/buttonform';
function Login({navigation}) {
  const [phone, setPhone] = useState('');
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');
  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      alert('Invalid code!');
      console.log('Invalid code.');
    }
  }
  const handleSubmit = async () => {
    if (phone.length < 11) {
      alert('Enter a valid number!');
      return;
    }
    setLoading(true);
    await auth()
      .signInWithPhoneNumber(phone)
      .then((confirmation) => {
        setConfirm(confirmation);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };
  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={Style.imgbg}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/logo.png')} style={Style.logo} />
        </View>
        {loading ? (
          <ActivityIndicator
            style={{marginTop: '60%'}}
            size={'large'}
            color={'white'}
          />
        ) : (
          <View style={Style.container}>
            {!confirm ? (
              <>
                <Item rounded style={Style.text}>
                  <Icon
                    active
                    name="mail-outline"
                    size={20}
                    style={Style.icons}
                  />
                  <Input
                    textContentType={'telephoneNumber'}
                    keyboardType={'phone-pad'}
                    value={phone}
                    onChangeText={(t) => setPhone(t)}
                    placeholder="Enter your phone no"
                    style={Style.inputtext}
                  />
                </Item>
                <View style={Style.buttons}>
                  <Button
                    title="Login"
                    isTrue="1"
                    onPress={() => handleSubmit()}
                  />
                </View>
              </>
            ) : (
              <>
                <Item rounded style={Style.text}>
                  <Icon
                    active
                    name="mail-outline"
                    size={20}
                    style={Style.icons}
                  />
                  <Input
                    keyboardType={'number-pad'}
                    value={code}
                    onChangeText={(t) => setCode(t)}
                    placeholder="Enter your confirmation code..."
                    style={Style.inputtext}
                  />
                </Item>
                <View style={Style.buttons}>
                  <Button
                    title="Verify"
                    isTrue="1"
                    onPress={() => {
                      if (code !== '') {
                        confirmCode();
                      }
                    }}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const Style = StyleSheet.create({
  logo: {
    width: 250,
    height: 250,
  },
  container: {
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
    width: '80%',
    top: 5,
  },
  forgot: {
    color: 'white',
    fontSize: 14,
  },
  buttons: {
    alignItems: 'center',
    position: 'relative',
    top: 35,
  },
});

export default Login;
