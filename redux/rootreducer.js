import {combineReducers} from 'redux';
import UserReducer from './Reducers/UserReducer';
import MenuReducer from './Reducers/MenuReducer';
import OrdersReducer from './Reducers/OrdersReducer';
import PlansReducer from './Reducers/PlansReducer';
export default combineReducers({
  User: UserReducer,
  Menu: MenuReducer,
  Orders: OrdersReducer,
  Plans: PlansReducer
});
