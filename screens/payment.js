import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Paymentcard from '../components/paymentcard';
import Paymentinfo from '../components/paymentinfo';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
import {Status} from '../utils/Constants';

import Data from '../data';
function Payment({navigation}) {
  const stateProps = useSelector(({Orders}) => {
    return {
      ...Orders,
    };
  });
  const {loading, data} = stateProps;
  let filteredOrders = data.filter(
    (item) => item.status === Status.RECIEVED || item.status === Status.COOKING,
  );
  const [date, setDate] = useState(new Date().toDateString());
  const getTotal = (data) => {
    let total = 0;
    data.map((item) => {

      total += parseInt(item.total-(item.total*0.05));
    });
    return total;
  };
  const getPending = (data) => {
    let total = 0;
    data.map((item) => {
      if(item.VendorPaid!=true){
      total += parseInt(item.total-(item.total*0.05));
      }
    });
    return total;
  };
  const getRecived = (data) => {
    let total = 0;
    data.map((item) => {
      if(item.VendorPaid==true){
      total += parseInt(item.total-(item.total*0.05));
      }
    });
    return total;
  };
  return (
    <View style={styles.container}>
    
    <Header title="Payments" onPress={() => navigation.openDrawer()} />

      <View style={styles.content}>
        
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width:"95%",
            alignSelf:'center'
          }}>
          <Paymentcard
            number={data.length}
            title="Orders."
            name="fast-food-outline"
            status="1"
          />
          <Paymentcard pay={true} number={getTotal(data)} pending={getPending(data)} recieved={getRecived(data)} title="Rs." name="cash" status="0" />
        </View>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width:"95%",
            alignSelf:'center'
          }}>
        <Paymentcard number={getPending(data)}  title="Pending" name="cash" status="0" />
          <Paymentcard number={getRecived(data)}  title="Recived" name="cash" status="0" />

        </View>
        <View style={styles.contentinner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(data).map(
              (item) => {
                return (
                  <View key={item[1].id}>
                    <Paymentinfo
                      order={item[1].id.substring(item[1].id.length-5, item[1].id.length)}
                      price={item[1].total}
                      name={"item[1]"}
                      uid={item[1].uid}
                      item={item[1]}
                      address={item[1].address} 
                      date={new Date(item[1].dateTime).toDateString()}
                      onpress={() =>
                        navigation.navigate('OrderDetails', {order: item[1]})
                      }
                    />
                  </View>
                );
              },
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '93%',
    alignSelf: 'center',
    marginBottom: 100,
    marginTop: 14,
  },
  contentinner: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 800,
    marginTop: 14,
  },
  orderno: {
    paddingTop: 10,
    fontSize: 18,
    height: 40,
  },
  payment: {
    fontSize: 18,
    height: 40,
  },
  address: {
    fontSize: 16,
    height: 30,
    color: 'grey',
  },
  date: {
    paddingTop: 10,
    fontSize: 15,
    height: 44,
    color: 'grey',
  },
});
