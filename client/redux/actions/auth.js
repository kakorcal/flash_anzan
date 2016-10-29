import axios from 'axios'
import {SET_CURRENT_USER, GET_CURRENT_USER, EDIT_CURRENT_USER, DELETE_CURRENT_USER} from '../constants'
import setAuthorizationToken from '../../utils/setAuthorizationToken'

export function login(data){
  return dispatch => {
    return axios.post('/api/auth', data);
  };
}

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function getCurrentUser(id){
  return dispatch => {
    return axios.get(`/api/users/${id}`);
  }
}

export function editCurrentUser(id, user){
  return dispatch => {
    return axios.put(`/api/users/${id}`, user);
  }
}

export function deleteCurrentUser(id){
  return dispatch => {
    return axios.delete(`/api/users/${id}`);
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}