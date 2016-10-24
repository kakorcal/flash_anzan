import {SET_SOUND_FX} from '../constants'

export function setSoundFX(fx){
  return {
    type: SET_SOUND_FX,
    fx
  };
}