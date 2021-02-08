import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserDetails} from '../redux/Actions/UserActions';
import {useDispatch} from 'react-redux';
import {getAFieldValueFromACollectionDocumentByAField} from '../firebase/helpers';
const ApprovalScreen = () => {
  const dispatch = useDispatch();
  const stateProps = useSelector(({User}) => {
    return {
      ...User,
    };
  });
  useEffect(() => {
    let interId = setInterval(() => checkApproval(), 5000);
    return () => {
      clearInterval(interId);
    };
  });
  const checkApproval = async () => {
    getAFieldValueFromACollectionDocumentByAField(
      'phoneNumber',
      phoneNumber,
      'approved',
      'vendors',
    )
      .then((approved) => {
        if (approved) {
          dispatch(getUserDetails({approved: approved}));
          alert('Your account has been approved!');
        }
      })
      .catch((err) => console.log(err));
  };
  const {fullname, phoneNumber, approved} = stateProps;
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/bg.jpeg')}
        style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: '20%',
            paddingHorizontal: '10%',
            paddingVertical: '30%',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
            }}>
            Hi , {fullname}
          </Text>
          <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>
            Waiting for your account approval from administration.
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default ApprovalScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 680,
    flex: 1,
  },

  logo: {
    width: '65%',
    height: 105,
    display: 'flex',
    alignSelf: 'center',
    marginTop: '20%',
  },
});
