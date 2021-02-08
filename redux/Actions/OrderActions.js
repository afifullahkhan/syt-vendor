import Orders from '../Constants/Orders';
import {
  readFromDatabaseRefwithField,
  updateFieldInDatabase,
} from '../../firebase/helpers';
import auth from '@react-native-firebase/auth';
import {convertToArray} from '../../utils/helpers';
export const loadOrders = (CB) => (dispatch) => {
  // dispatch({type: Orders.LOAD_ORDERS, payload: {loading: true}});
  readFromDatabaseRefwithField(
    'orders',
    'vendorId',
    auth().currentUser.uid,
    (res) => {
      dispatch({
        type: Orders.LOAD_ORDERS,
        payload: {loading: false, data: res},
      });
    },
  ).catch((err) => {
    console.log(err);
    dispatch({type: Orders.LOAD_ORDERS, payload: {loading: false}});
  });
};
export const updateStatus = (docId, status, CB) => (dispatch) => {
  dispatch({type: Orders.UPDATE_ORDER_STATUS, payload: true});
  updateFieldInDatabase('orders', docId, 'status', status)
    .then((res) => {
      CB && CB();
      dispatch({type: Orders.UPDATE_ORDER_STATUS, payload: false});
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: Orders.UPDATE_ORDER_STATUS, payload: false});
    });
};
