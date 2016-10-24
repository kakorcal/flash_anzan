import {SET_CURRENT_SUM, EVALUATE_RESULT} from '../constants'

const initialState = {
  currentSum: null,
  playerAnswer: null,
  result: null
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case SET_CURRENT_SUM:
      return Object.assign({}, state, {currentSum: action.sum});
    case EVALUATE_RESULT:
      return Object.assign({}, state, {result: action.result, playerAnswer: action.playerAnswer});
    default: return state;
  }
}
