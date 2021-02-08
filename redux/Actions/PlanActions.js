/* eslint-disable prettier/prettier */
import Plan from '../Constants/Plan';
import {
  deleteADocumentByField,
  deleteADocumentById,
  getCollectionByField,
  insertToFirestore,
} from '../../firebase/helpers';
import auth from '@react-native-firebase/auth';
import {convertToArray} from '../../utils/helpers';
export const getPlans = (CB) => (dispatch) => {
  dispatch({type: Plan.GET_PLANS, payload: {loading: true}});
  getCollectionByField(
    'plans',
    'resPhoneNumber',
    auth().currentUser.phoneNumber,
  )
    .then((res) => {
      dispatch({
        type: Plan.GET_PLANS,
        payload: {loading: false, data: convertToArray(res)},
      });
    })
    .catch((err) => {
      dispatch({type: Plan.GET_PLANS, payload: {loading: false}});
    });
};
export const addPlan = (payload, CB) => (dispatch) => {
  dispatch({type: Plan.ADD_PLAN, payload: {loading: true}});
  insertToFirestore(payload, 'plans', () => {
    CB && CB();
    dispatch({type: Plan.ADD_PLAN, payload: {loading: false}});
  });
};
export const deletePlan = (docId, CB) => (dispatch) => {
  dispatch({type: Plan.DELETE_PLAN, payload: {loading: true}});
  deleteADocumentById('plans', docId)
    .then((res) => {
      CB && CB();
      dispatch({type: Plan.DELETE_PLAN, payload: {loading: false}});
    })
    .catch((err) => {
      dispatch({type: Plan.DELETE_PLAN, payload: {loading: false}});
    });
};

