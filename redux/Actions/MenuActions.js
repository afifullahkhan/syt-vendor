import Menu from '../Constants/Menu';
import {
  deleteADocumentByField,
  deleteADocumentById,
  getCollectionByField,
  insertToFirestore,
} from '../../firebase/helpers';
import auth from '@react-native-firebase/auth';
import {convertToArray} from '../../utils/helpers';
export const getMenuItems = (CB) => (dispatch) => {
  dispatch({type: Menu.GET_MENU_ITEMS, payload: {loading: true}});
  getCollectionByField(
    'menuItems',
    'phoneNumber',
    auth().currentUser.phoneNumber,
  )
    .then((res) => {
      dispatch({
        type: Menu.GET_MENU_ITEMS,
        payload: {loading: false, data: convertToArray(res)},
      });
    })
    .catch((err) => {
      dispatch({type: Menu.GET_MENU_ITEMS, payload: {loading: false}});
    });
};
export const addMenuItem = (payload, CB) => (dispatch) => {
  dispatch({type: Menu.ADD_MENU_ITEM, payload: {loading: true}});
  insertToFirestore(payload, 'menuItems', () => {
    CB && CB();
    dispatch({type: Menu.ADD_MENU_ITEM, payload: {loading: false}});
  });
};
export const deleteMenuItem = (docId, CB) => (dispatch) => {
  dispatch({type: Menu.DELETE_MENU_ITEM, payload: {loading: true}});
  deleteADocumentById('menuItems', docId)
    .then((res) => {
      CB && CB();
      dispatch({type: Menu.DELETE_MENU_ITEM, payload: {loading: false}});
    })
    .catch((err) => {
      dispatch({type: Menu.DELETE_MENU_ITEM, payload: {loading: false}});
    });
};

