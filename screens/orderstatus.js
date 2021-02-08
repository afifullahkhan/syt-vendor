import React from 'react';
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import Radioform,{
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import Button from '../components/button';

import Order from '../components/orderstatuscard';
import Header from '../components/header';
import {  } from 'react-native-gesture-handler';
function Orderstatus(props) {
  const status = [
    {label: 'On Hold', value: 0},
    {label: 'Processing', value: 1},
    {label: 'Completed', value: 2},
    {label: 'Dispatch', value: 3},
  ];
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Header
        title={`Order # ${props.route.params.orderno}`}
        onPress={() => navigation.goBack()}
        type="back"
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Order orderno={props.route.params.orderno} />
        <Text style={styles.heading}>Order Details</Text>
        <View style={styles.head}>
          <Text style={styles.contenthead}>
            Order Items : {props.route.params.orderitem}
          </Text>
          <Text style={styles.contenthead}>
            Payment Type : {props.route.params.orderno}
          </Text>
          <Text style={styles.contenthead}>
            Voucher : {props.route.params.orderno}
          </Text>
          <Text style={styles.contenthead}>
            Total Amount : {props.route.params.price}
          </Text>
        </View>
        <Text style={styles.heading}>Customer Details</Text>
        <View style={styles.head}>
          <Text style={styles.contenthead}>
            Customer Name : {props.route.params.name}
          </Text>
          <Text style={styles.contenthead}>
            Customer Address : {props.route.params.address}
          </Text>
          <Text style={styles.contenthead}>
            Number : {props.route.params.orderno}
          </Text>
        </View>

        <Text style={styles.heading}>Change status order</Text>
        <View style={styles.statusview}>
          <Radioform
          radio_props={status}
          initial={0}
          buttonSize={10}
          labelStyle={{fontSize:15,marginBottom:12,
            fontFamily:'Montserrat-SemiBold',}}
          selectedLabelColor={'green'}
          onPress={(value)=>{console.log(value)}}
          formHorizontal={false}
          animation={true}
         
          />
        </View>
        <View style={styles.button}>
              <Button title="Save Order" isTrue="0" />
            </View>
            </ScrollView>
      </View>
    </View>
  );
}

export default Orderstatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    marginBottom:130,
    marginTop:12
  },
  heading: {
    fontSize: 17,
    fontFamily:'Montserrat-Bold',
    marginVertical: 10,
    padding: 4,
  },
  head: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 12,
    paddingVertical: 17,
    borderRadius: 8,
  },
  contenthead: {
    fontFamily:'Montserrat-SemiBold',
    color: 'grey',
    marginVertical: 4,
  },
  statusview:{
    borderWidth:0.8,
    borderRadius:8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderColor:'gray'
  },
  button:{
    width:"45%",
    alignSelf:'center',
    marginTop:25
  }
});
