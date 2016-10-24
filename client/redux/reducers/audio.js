import {SET_SOUND_FX} from '../constants'

const initialState = {
  blip: null,
  correct: null,
  wrong: null
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case SET_SOUND_FX:
      return action.fx.reduce((acc, sound) => {
        acc[sound.name] = sound;
        return acc;
      }, state);
    default: return state;
  }
}