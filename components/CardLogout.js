import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Left, Right, Card, CardItem, View} from 'native-base';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

function CardLogout(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.9}
      shadowOpacity={0.9}>
      <Card style={styles.card}>
        <CardItem>
          <Left>
            {props.type === 'icon' ? (
              <View style={{flexDirection: 'row'}}>
                <Icon active name={props.name} size={30} color="grey" />
                <Text style={styles.heading}>{props.title}</Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row',paddingVertical:10}}>
                <Avatar
                  rounded
                  size={70}
                  source={{
                    uri:
                      props.image,
                  }}
                />
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.heading}>{props.name}</Text>
                  <Text style={styles.email}>{props.email}</Text>
                </View>
              </View>
            )}
          </Left>
          <Right>
            <Icon active name={props.name1} size={24} color="grey" />
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  heading: {
    paddingLeft: 5,
    fontSize: 17,
    fontFamily:'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  email: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily:'Montserrat-SemiBold',
    color: 'grey',
  },
});

export default CardLogout;
