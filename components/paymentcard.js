import React,{useState,useEffect} from 'react';
import {StyleSheet, Text,  View} from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCollectionDocumentByFieldss} from '../firebase/helpers'

function PaymentCard(props) {

 

  
  return (
        <Card style={styles.cardin}>
          <View
            style={
              props.status == '1' ? styles.backgroundorder : styles.backgroundprice
            }>
            <Icon
              active
              name={props.name}
              color="white"
              size={25}
              style={props.status == '1' ? styles.order : styles.price}
            />
          </View>

          <View style={{display:'flex',flexDirection:'column'}}>
            
          <Text style={styles.heading}>
              {props.title}
            </Text>
            <Text
              style={props.status == '1' ? styles.numberorder : styles.numberprice}>
              {props.number}
            </Text>
          </View>
        </Card>
  );
}

const styles = StyleSheet.create({
  cardin: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'column',
    display: 'flex',
    width:'47%',
    overflow: 'hidden',
    borderRadius:12,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 6,
  },
  heading: {
    fontFamily:'Montserrat-Bold',
    fontSize: 17,
    color:'black'
  },
  numberorder: {
    fontSize: 22,
    color: 'green',
    fontFamily:'Montserrat-SemiBold',
  },
  numberprice: {
    fontSize: 22,
    color: '#3E89EF',
    fontFamily:'Montserrat-SemiBold',
  },
  backgroundorder: {
    padding: 20,
    backgroundColor: 'rgba(78, 164, 86,0.3)',
    left: 35,
    marginTop: -25,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  backgroundprice: {
    padding: 20,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(62, 136, 239,0.3)',
    left: 35,
    marginTop: -25,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  order: {
    backgroundColor: 'rgba(78, 164, 86,0.85)',
    padding: 10,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: 'flex-end',
  },
  price: {
    backgroundColor: 'rgba(62, 136, 239,0.7)',
    padding: 10,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: 'flex-end',
  },
});

export default PaymentCard;
