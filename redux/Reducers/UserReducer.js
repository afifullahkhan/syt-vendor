import Users from '../Constants/Users';
const iState = {
  fullname: '',
  phoneNumber: '',
  image: '',
  address: '',
  uid: '',
};

const UserReducer = (state = iState, action={}) => {
  switch (action.type) {
    case Users.GET_USER_INFO:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default UserReducer;
