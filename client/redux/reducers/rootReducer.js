import {combineReducers} from 'redux'
import auth from './auth'
import levels from './levels'
import audio from './audio'

export default combineReducers({
  auth, levels, audio
});