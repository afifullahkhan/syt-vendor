import React,{useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LogoutCard from '../components/CardLogout';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {CheckBox} from 'native-base';
import Header from '../components/header';
import Activecart from '../components/ActiveCard';
function Settings({navigation}) {
  const [status,setStatus] =useState(false)
  const funcheck=()=>{
    if(status===false)
    {
      setStatus(true)
    }
    else if(status===true)
    {
      setStatus(false)
    }
  }
  const stateProps = useSelector(({User}) => {
    return {
      ...User,
    };
  });
  const {fullname, phoneNumber, approved, image} = stateProps;

  return (
    <View style={styles.container}>
      <Header title="Settings" onPress={() => navigation.openDrawer()} />
      <View style={styles.content}>
      <LogoutCard
          name={fullname}
          email={phoneNumber}
          image={image}
          //name1="chevron-forward-outline"
          //onPress={() => navigation.navigate('Accountinfo')}
        />
        <Text style={styles.texthead}>Information</Text>
        <Activecart
          //onPress={() => auth().signOut()}
          title="Active"
          name="log-out-outline"
          type="icon"
        />
        <LogoutCard
          title="Edit Account"
          name="person-add-outline"
          name1="chevron-forward-outline"
          type="icon"
          onPress={() => navigation.navigate('Editinfo')
          //setEdit(true)
        }
        />  
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  content:{
    alignSelf:'center',
    width:"90%",
    marginTop:10
  },
  texthead: {
    marginVertical: 10,
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    color: 'grey',
  }
});
