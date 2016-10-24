import {SET_SOUND_FX, TOGGLE_VOLUME} from '../constants'

const initialState = {
  blip: null,
  correct: null,
  wrong: null,
  volume: true
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case SET_SOUND_FX:
      return action.fx.reduce((acc, sound) => {
        acc[sound.name] = sound;
        return acc;
      }, state);
    case TOGGLE_VOLUME:
      return Object.assign({}, state, {volume: !state.volume});
    default: return state;
  }
}