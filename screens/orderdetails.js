import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { Divider } from 'react-native-elements';
import Header from '../components/header';

import { Card } from 'native-base';
import { getCollectionByField, getImagefromFBStorage } from '../firebase/helpers';
import { convertToArray, MappedElement } from '../utils/helpers';
import { OrderTypes } from '../utils/Constants';

function Orderdetails(props) {
  const { route, navigation } = props;
  const { order } = route.params;
  const { items, total, id, uid, type, plan } = order;
  const [customer, setCustomer] = useState({
    name: '',
    address: 'acbasd addfess',
    email: '',
  });
  const [Imagurl, setImagurl] = useState("")
  useEffect(() => {
    getCollectionByField('users', 'id', uid)
      .then((res) => {
        if (res.length) {
          let user = res[0].data();
          setCustomer({
            name: user.username,
            address: 'aasdf asdfsad',
            email: user.email,
          });
        }
        if(order.VendorPaid==true){
          getCollectionByField("VendorPayments","orderid",id).then(res=>{
            getImagefromFBStorage(convertToArray(res)[0].receiptimg).then(str=>{
              setImagurl(str);
            })  
          })
          
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        title="Order Details"
        onPress={() => navigation.goBack()}
        type="back"
      />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={styles.card}>
              <View style={styles.contentinner}>
                <Text style={styles.heading}>Order Info</Text>
                <Text style={styles.data}>
                  Order No:
                </Text>
                <Text style={styles.datacome}>
                  {String(id).slice(id.length - 5, id.length)}
                </Text>

                <Text style={styles.data}>
                  Order Items:{' '}

                </Text>
                <Text style={styles.datacome}>
                  <MappedElement
                    data={items || plan.menuItems}
                    renderElement={(obj, index) => (obj.name || obj.label)+" x"+obj.qty + ','}
                  />{' '}
                </Text>

                <Text style={styles.data}>Payment Type: </Text>
                <Text style={styles.datacome}>
                  Cash on Delivery
                </Text>

                <Text style={styles.data}>Voucher:</Text>
                <Text style={styles.datacome}>{order.voucher==null?"--":order.voucher}</Text>

                <Text style={styles.data}>Total Amount:</Text>
                <Text style={styles.datacome}>{total-(total*0.05)}</Text>
                
                <Text style={styles.data}>Paid:</Text>
                <Text style={styles.datacome}>{order.VendorPaid==true?"Paid":"Not Paid"}</Text>
                {order.VendorPaid==true&&Imagurl!==""?
                <Image source={{uri:Imagurl}} style={{width:"100%",height:200}} resizeMode="contain"></Image>
                :null}
                {type === OrderTypes.SCHEDULED && (
                  <>
                    <Text style={styles.data}>Date and Time:</Text>
                    <Text style={styles.datacome}>
                      {new Date(order.deliverDateTime).toLocaleDateString() +
                        ' - ' +
                        new Date(order.deliverDateTime).toLocaleTimeString()}
                    </Text>
                  </>
                )}
              </View>
              <Divider />
              <View style={styles.contentinner}>
                <Text style={styles.heading}>Customer Info</Text>
                <Text style={styles.data}>Name:</Text>
                <Text style={styles.datacome}>{customer.name}</Text>

                <Text style={styles.data}>Address:</Text>
                <Text style={styles.datacome}>{order.address.name}</Text>

                <Text style={styles.data}>Email:</Text>
                <Text style={styles.datacome}>{customer.email}</Text>
              </View>
            </Card>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default Orderdetails;

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
    marginBottom: 100,
  },
  card: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.46,
    shadowRadius: 10.14,

    elevation: 3,
  },
  contentinner: {
    marginVertical: 15,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#B41116',
    marginVertical: 5,
  },
  headingdel: {
    fontSize: 23,
    fontFamily: 'Montserrat-Bold',
    color: '#B41116',
    marginTop: 10,
    alignSelf: 'center',
  },
  data: {
    marginVertical: 3,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  datacome: {
    marginVertical: 2,
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
  },
});
