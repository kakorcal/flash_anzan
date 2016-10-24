import {UPDATE_CURRENT_LEVEL} from '../constants'

export function updateCurrentLevel(payload){
  return {
    payload,
    type: UPDATE_CURRENT_LEVEL
  };
}