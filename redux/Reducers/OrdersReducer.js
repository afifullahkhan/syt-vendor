import Orders from '../Constants/Orders';
const iState = {
  loading: true,
  data: [],
  statusLoading: false,
};
const OrdersReducer = (state = iState, action = {}) => {
  switch (action.type) {
    case Orders.LOAD_ORDERS:
      return {...state, ...action.payload};
    case Orders.UPDATE_ORDER_STATUS:
      return {...state, statusLoading: action.payload};
    default:
      return state;
  }
};
export default OrdersReducer;
