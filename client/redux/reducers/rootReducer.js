import {combineReducers} from 'redux'
import auth from './auth'
import levels from './levels'

export default combineReducers({
  auth, levels
});