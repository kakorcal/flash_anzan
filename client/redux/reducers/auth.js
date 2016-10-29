import {SET_CURRENT_USER, DELETE_CURRENT_USER} from '../constants'
import {isEmpty} from 'lodash'

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case SET_CURRENT_USER: 
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    // case GET_CURRENT_USER:
    //   return {
    //     isAuthenticated: !isEmpty(action.user),
    //     user: action.user
    //   };
    // case EDIT_CURRENT_USER:
    //   return {
    //     isAuthenticated: !isEmpty(action.user),
    //     user: action.user
    //   };
    case DELETE_CURRENT_USER:
      return Object.assign({}, initialState);
    default: return state;
  }
}