import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootreducer';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk),
);

export default store;
