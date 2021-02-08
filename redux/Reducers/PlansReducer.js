import Plan from '../Constants/Plan';
const iState = {
  loading: false,
  data: [],
};
const PlansReducer = (state = iState, action = {}) => {
  switch (action.type) {
    case Plan.GET_PLANS:
      return {...state, ...action.payload};
    case Plan.ADD_PLAN:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default PlansReducer;
