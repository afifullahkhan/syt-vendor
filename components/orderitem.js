import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MappedElement} from '../utils/helpers';

function Ordercard({orderItem, onPress, index}) {
  const {status, id, items, total, dateTime} = orderItem;
  const [showModal, setShowModal] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={styles.orderstatus}>{status}</Text>
        <Icon
          name="clipboard-text"
          size={32}
          color="#3E86EF"
          style={{width: '16%'}}
        />
        <View>
          <Text style={styles.orderno}>
            # {String(id).slice(id.length - 5, id.length)}
          </Text>
          <Text style={styles.orderdate}>
            {Date(dateTime).toLocaleUpperCase()}
          </Text>
          {/*<Text style={styles.orderdate}>Order Item:{props.orderitem}</Text>*/}
          <Text style={styles.orderdate}>Amount: {total}</Text>
          <Divider style={{marginVertical: 12, width: '205%'}} />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Order Items</Text>
            <MappedElement
              data={items}
              renderElement={(obj, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'space-between',
                    }}>
                    <Text> {obj.name}, </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderno: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  orderstatus: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#3E86EF',
    color: 'white',
    borderRadius: 14,
    position: 'absolute',
    right: 5,
    fontSize: 12,
    paddingBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  orderdate: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 3,
    fontFamily: 'Montserrat-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Ordercard;
