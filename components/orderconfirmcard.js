import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Left, Right, Card, CardItem} from 'native-base';
import Button from './button';
import {getRemainingTime, MappedElement} from '../utils/helpers';
import {OrderTypes, Status} from '../utils/Constants';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {loadOrders, updateStatus} from '../redux/Actions/OrderActions';
function Orderconfirmcard({order, index, onDetailsClickHandler}) {
  const {id, total, items, status, type,plan} = order;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(status);
  const stateProps = useSelector(({Orders}) => {
    return {...Orders};
  });
  const {statusLoading} = stateProps;
  const handleStatusChange = () => {
    dispatch(
      updateStatus(id, selectedValue, () => {
        dispatch(loadOrders());
      }),
    );
  };
  const renderStatusModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showStatusModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Order Status</Text>
            {statusLoading ? (
              <ActivityIndicator
                style={{marginTop: '30%'}}
                size={'large'}
                color={'red'}
              />
            ) : (
              <>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{height: 50, width: '100%'}}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }>
                      <Picker.Item
                        label="Just Recieved"
                        value={Status.RECIEVED}
                      />
                      <Picker.Item label="Cooking" value={Status.COOKING} />
                      <Picker.Item
                        label="Hand over to a rider"
                        value={Status.FINISHED_COOKING}
                      />
                    </Picker>
                  </View>
                </View>

                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: 'green',
                    paddingHorizontal: 70,
                    paddingVertical: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => handleStatusChange()}>
                  <Text style={styles.textStyle}>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#A40F13',
                    padding: 10,
                  }}
                  onPress={() => {
                    setShowStatusModal(false);
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <Card style={styles.card}>
      <CardItem style={{borderRadius: 10}}>
        <Left>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.menu}>
              Order #: {String(id).slice(id.length - 5, id.length)}
            </Text>
            <Text style={styles.menuprice}>Rs. {total}</Text>
            <Text style={styles.menutype}>Order items: {items?.length || plan?.menuItems?.length} </Text>
            {type === OrderTypes.SCHEDULED && (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: 'green',
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 2,
                    marginRight: 5,
                  }}>
                  Scheduled
                </Text>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: 'red',
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 2,
                  }}>
                  {getRemainingTime(order.deliverDateTime)}
                </Text>
              </View>
            )}
            {type=== OrderTypes.WITH_PLAN && 
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: 'green',
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 2,
                    marginRight: 5,
                  }}>
                  Plan
                </Text>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: 'red',
                    color: 'white',
                    textAlign: 'center',
                    marginVertical: 2,
                  }}>
                  {plan?.type}
                </Text>
              </View>
            }
          </View>
        </Left>
        <Right>
          <View style={styles.button}>
            <View style={{marginBottom: 10}}>
              <Button
                title="Details"
                isTrue="1"
                onPress={() => onDetailsClickHandler()}
              />
            </View>
            <Button
              title="Status"
              isTrue="0"
              onPress={() => setShowStatusModal(true)}
            />
          </View>
        </Right>
      </CardItem>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Order Items</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
              }}>
              <MappedElement
                data={items}
                renderElement={(obj, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}>
                      <Text> {index + 1} </Text>
                      <Text> {obj.name} </Text>
                      <Text>Rs. {obj.price}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#A40F13',
                padding: 10,
              }}
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {renderStatusModal()}
    </Card>
  );
}

export default Orderconfirmcard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 15,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 5,
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
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  button: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '70%',
    minHeight: '40%',
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
    fontSize: 20,
  },
  pickerContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
  },
});
