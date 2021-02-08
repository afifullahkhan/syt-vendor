import Users from '../Constants/Users';
export const getUserDetails = (data) => (dispatch) => {
  dispatch({type: Users.GET_USER_INFO, payload: data});
};
