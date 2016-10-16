import axios from 'axios'
import constants from '../constants'
const {GOOGLE_LOGIN} = constants;

export function googleLogin(){
  const promise = axios.get('/auth');
  return {
    type: GOOGLE_LOGIN,
    payload: promise
  }
}