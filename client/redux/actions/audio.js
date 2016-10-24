import {SET_SOUND_FX, TOGGLE_VOLUME} from '../constants'

export function setSoundFX(fx){
  return {
    type: SET_SOUND_FX,
    fx
  };
}

export function toggleVolume(){
  return {
    type: TOGGLE_VOLUME
  }
}