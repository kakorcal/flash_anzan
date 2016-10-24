import {combineReducers} from 'redux'
// import auth from './auth'
import levels from './levels'
import audio from './audio'
import game from './game'

export default combineReducers({
  levels, audio, game
});