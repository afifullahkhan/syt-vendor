import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/homecard';
import Cardorder from './orderconfirmcard';
import {useDispatch, useSelector} from 'react-redux';
import {loadOrders} from '../redux/Actions/OrderActions';
import {MappedElement} from '../utils/helpers';
import {Status} from '../utils/Constants';
import database from '@react-native-firebase/database';
const HomeComponent = ({fullname, navigation}) => {
  const dispatch = useDispatch();
  const intervalObj = useRef();
  const stateProps = useSelector(({Orders}) => {
    return {
      ...Orders,
    };
  });
  const {loading, data} = stateProps;
  let filteredOrders = data.filter(
    (item) => item.status === Status.RECIEVED || item.status === Status.COOKING,
  );
  useEffect(() => {
    intervalObj.current = setInterval(() => {
      dispatch(loadOrders());
    }, 8000);
    () => {
      clearInterval(intervalObj.current);
    };
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        style={{marginTop: '50%'}}
        size={'large'}
        color={'red'}
      />
    );
  }
  const getTotal = (data) => {
    let total = 0;
    data.map((item) => {
      total += parseInt(item.total);
    });
    return total;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: '96%',
          alignSelf: 'center',
        }}>
        <Text style={styles.heading}>Hi ,{fullname}</Text>
        <Text style={styles.headingdate}>{new Date().toDateString()}</Text>
      </View>
      <View
        style={{
          width: '94%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Text style={styles.heading1}>This Month</Text>
        {/*<Text*/}
        {/*  style={styles.heading2}*/}
        {/*  onPress={() => navigation.navigate('Allreport')}>*/}
        {/*  All Report*/}
        {/*</Text>*/}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Card
          number={data.length}
          title="Orders."
          name="fast-food-outline"
          status="0"
        />
        <Card number={getTotal(data)} title="Rs." name="cash" status="1" />
      </View>
      <View style={{marginTop: 10}}>
        <MappedElement
          data={filteredOrders}
          renderElement={(obj, index) => {
            return (
              <Cardorder
                key={obj.id}
                order={obj}
                index={index}
                onDetailsClickHandler={() =>
                  navigation.navigate('OrderDetails', {order: obj})
                }
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
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
export default HomeComponent;
