import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '../redux/Actions/UserActions';
import Header from '../components/header';
import auth from '@react-native-firebase/auth';
import Cardorder from '../components/orderconfirmcard';
import {checkIfDetailsExistByPhone, getCollectionByField} from '../firebase/helpers';
import DetailsScreen from './DetailsScreen';
import ApprovalScreen from './ApprovalScreen';
import Addresses from '../components/AddAddress'
import HomeComponent from '../components/HomeComponent';
import { convertToArray } from '../utils/helpers';
function Home(props) {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [hasDetails, setHasDetails] = useState(null);
  const [hasAddress, sethasAddress] = useState(null);
  const stateProps = useSelector(({User}) => {
    return {
      ...User,
    };
  });
  const {fullname, phoneNumber, approved} = stateProps;
  useEffect(() => {
    checkban();
    setTimeout(() => {
       // alert("");
        console.log("Here");
        checkban();
    }, 5000*60); 
    const backAction = () => {
         


      Alert.alert('Hold on!', 'Are you sure you want to quit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    setLoading(true);
    getCollectionByField("Addresses","uid",auth().currentUser.uid).then(res=>{
      if(res.length>0){
        sethasAddress(res[0].data());
      }
    })

    checkIfDetailsExistByPhone(auth().currentUser.phoneNumber)
      .then((res) => {
        if (res) {
          setHasDetails(true);
          dispatch(getUserDetails(res));
        } else {
          setHasDetails(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    return () => backHandler.remove();
  }, []);

 const checkban=()=>{
  if(auth().currentUser==null){
        
    return;
  }
    getCollectionByField("vendors","uid",auth().currentUser.uid).then(res=>{
      var data =convertToArray(res)[0];
      if(data.allow==false){
        //alert("You have been ban from admin.");
        Alert.alert('Ban!', 'You have been ban from admin.', [
          {
            text: 'Ok',
            onPress: () => BackHandler.exitApp(),
            style: 'cancel',
          },
        ]);
      }
    })
  }

  if (loading) {
    return (
      <ActivityIndicator
        style={{marginTop: '50%'}}
        size={'large'}
        color={'red'}
      />
    );
  }
  if (!hasDetails) {
    return <DetailsScreen onSave={() => setHasDetails(true)} />;
  }
  if (!hasAddress) {
    return <Addresses onSave={(prp) => sethasAddress(prp)} />;
  }
  if (!approved) {
    return <ApprovalScreen />;
  }
  return (
    <View style={styles.container}>
      <Header title="Home" onPress={() => navigation.openDrawer()} />
      <View style={styles.content}>
        <HomeComponent navigation={navigation} fullname={fullname} />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(241, 243, 248,0.2)',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 90,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Montserrat-Regular',
  },
  heading1: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },
  headingdate: {
    fontFamily: 'Montserrat-Regular',
  },
  heading2: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#3E89EF',
    fontFamily: 'Montserrat-Regular',
  },
});
