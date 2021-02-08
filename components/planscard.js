/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Left, Right, Card, CardItem } from 'native-base';
import Button from './button';
import { MappedElement } from '../utils/helpers';
import { Alert } from 'react-native';

function plancard({ plan, onDelete }) {
  const handleDelete = () => {
    Alert.alert(
      'Please Confirm',
      'Are you sure you want to delete ' + plan.name + ' ?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => onDelete(plan.id),
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <Card style={styles.card}>
      <CardItem style={{ borderRadius: 10 }}>
        <Left>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.plan}>{plan.name || ""}</Text>
            <Text style={styles.plandes}>
              <MappedElement data={plan.menuItems || []} renderElement={(menuItem, index) => {
                return menuItem.label + ', '
              }} />
            </Text>
            <Text>Days: {plan.days|| "-"}</Text>
          </View>
        </Left>
        <Right>
          <View>
            <Text style={styles.planprice}>Rs. {plan.price}</Text>
            <Text style={styles.planprice}>Type: {plan.type}</Text>
            <View style={styles.button}>
              <Button onPress={() => handleDelete()}
                title="Delete" isTrue="1" />
            </View>
          </View>
        </Right>
      </CardItem>
    </Card>
  );
}

export default plancard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 15,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 3,
  },
  plan: {
    fontSize: 18,
    color: '#B41116',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
  },
  plandes: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'Montserrat-SemiBold'
  },
  planprice: {
    fontSize: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
  },
  button: {
    width: 80,
    alignSelf:'flex-end'
  },
});
