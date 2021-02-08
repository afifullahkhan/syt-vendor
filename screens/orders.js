import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import Orderitem from '../components/orderitem';
import Data from '../data';
import Header from '../components/header';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {loadOrders} from '../redux/Actions/OrderActions';
import {MappedElement} from '../utils/helpers';
function Orders({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stateProps = useSelector(({Orders}) => {
    return {...Orders};
  });
  const {loading, data} = stateProps;
  if (loading) {
    return (
      <ActivityIndicator
        style={{marginTop: '50%'}}
        size={'large'}
        color={'red'}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header title="Orders" onPress={() => navigation.openDrawer()} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MappedElement
            data={data}
            renderElement={(obj, index) => (
              <Orderitem
                key={obj.id}
                orderItem={obj}
                index={index}
                onPress={() =>
                  navigation.navigate('OrderDetails', {order: obj})}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}
export default Orders;
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
    marginBottom: 75,
    marginTop: 10,
  },
});
