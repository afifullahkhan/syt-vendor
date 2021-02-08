import Menu from '../Constants/Menu';
const iState = {
  loading: false,
  data: [],
};
const MenuReducer = (state = iState, action = {}) => {
  switch (action.type) {
    case Menu.GET_MENU_ITEMS:
      return {...state, ...action.payload};
    case Menu.ADD_MENU_ITEM:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default MenuReducer;
