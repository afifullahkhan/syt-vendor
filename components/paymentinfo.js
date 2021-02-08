import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Left, Right, Card, CardItem} from 'native-base';
import {getCollectionDocumentByFieldss} from '../firebase/helpers'

function paymentinfocard(props) {
  const [Name, setName] = useState("");
  useEffect(() => {
    console.log(props.uid);
    getCollectionDocumentByFieldss("users","id",props.uid).then((re)=>{
      setName(re.docs[0].data().username);
    })  
  }, [])
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={1}>
      <Card style={styles.card}>
        <CardItem style={{borderRadius: 10}}>
          <Left>
            <View style={{paddingLeft: 5}}>
              <Text style={styles.order}>Order # {props.order}</Text>
              <View>
                <Text style={styles.custom}>Name: </Text>
                <Text style={styles.customdata}>{Name}</Text>
                <Text style={styles.custom}>Address: </Text>
                <Text style={styles.customdata}>{props.item.address.name==null?"--":props.item.address.name}</Text>
              </View>
            </View>
          </Left>
          <Right style={{alignSelf:'flex-start'}}>
            <Text style={styles.date}>{props.date}</Text>

            <Text style={styles.dateamount}>Rs. {props.price}</Text>
            <Text>{props.item.VendorPaid==true?"Paid":"Not Paid"}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

export default paymentinfocard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 1,
    flex: 1,
    paddingVertical: 1,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 5,
  },
  order: {
    fontSize: 17,
    color: '#B41116',
    fontFamily: 'Montserrat-Bold',
  },
  custom: {
    fontSize: 12,
    color: '#777777',
    fontFamily: 'Montserrat-SemiBold',
    width: '90%',
  },
  customdata: {
    color: '#777777',
    fontFamily: 'Montserrat-Bold',
    width: '120%',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular',
  },
  dateamount: {
    fontSize: 15,
    marginTop: 3,
    fontFamily: 'Montserrat-Bold',
  },
});
