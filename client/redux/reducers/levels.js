import {UPDATE_CURRENT_LEVEL} from '../constants'
import levels from '../../config/levels'

const initialState = {
  currentLevel: levels[0],
  currentIdx: 0
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case UPDATE_CURRENT_LEVEL:
      return Object.assign({}, state, action.payload);
    default: return state;
  }
};