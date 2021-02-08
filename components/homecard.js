import React from 'react';
import {StyleSheet, Text,  View} from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

function HomeCard(props) {
  return (
        <Card style={styles.cardin}>
          <View
            style={{alignSelf:'flex-start',
            marginLeft:-7
            }}>
            <Icon
              active
              name={props.name}
              color="white"
              size={20}
              style={props.status == '1' ? styles.order : styles.price}
            />
          </View>

          <View style={{display:'flex',flexDirection:'column',alignSelf:'flex-start',marginTop:12}}>
            
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
    overflow: 'hidden',
    borderRadius:12,
    width:'48%',
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
    color: '#FF4D00',
    fontFamily:'Montserrat-Bold',
  },
  numberprice: {
    fontSize: 22,
    color: '#3E89EF',
    fontFamily:'Montserrat-Bold',
  },
  order: {
    backgroundColor: '#FF4D00',
    padding: 8,
    borderRadius: 25,
    alignSelf: 'center',
    alignContent:'flex-start'
  },
  price: {
    backgroundColor: 'rgba(62, 136, 239,0.7)',
    padding: 8,
    borderRadius: 25,
    alignSelf: 'center',
    alignContent:'flex-start'
  },
});

export default HomeCard;
