import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Left, Right, Card, CardItem} from 'native-base';
import Button from './button';
import {useDispatch} from 'react-redux';
import {deleteMenuItem} from '../redux/Actions/MenuActions';
const menucard = ({item, onDelete}) => {
  const {name, description, price, category, id} = item;
  const handleDelete = () => {
    Alert.alert(
      'Please Confirm',
      'Are you sure you want to delete ' + name + ' ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => onDelete(id),
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <Card style={styles.card}>
      <CardItem style={{borderRadius: 10}}>
        <Left>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.menu}>{name}</Text>
            <Text style={styles.menutype}>Category: {category}</Text>
            <Text style={styles.menudes}>Description: {description}</Text>
          </View>
        </Left>
        <Right>
          <View>
            <Text style={styles.menuprice}>Rs.{price}</Text>
            <View style={styles.button}>
              <Button
                onPress={() => handleDelete()}
                title="Delete"
                isTrue="1"
              />
            </View>
          </View>
        </Right>
      </CardItem>
    </Card>
  );
};

export default menucard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 12,
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
  menu: {
    fontSize: 17,
    color: '#B41116',
    fontFamily: 'Montserrat-Bold',
  },
  menutype: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'Montserrat-SemiBold',
  },
  menudes: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'Montserrat-SemiBold',
  },
  menuprice: {
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
  },
  button: {
    width: 80,
  },
});
