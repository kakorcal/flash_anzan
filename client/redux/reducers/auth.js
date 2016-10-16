import constants from '../constants'

const {GOOGLE_LOGIN} = constants;

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch(action.type){
    case GOOGLE_LOGIN: 
      return state;
    default: return state;
  }
}