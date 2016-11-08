import axios from 'axios'
import {SET_CURRENT_USER, GET_CURRENT_USER, EDIT_CURRENT_USER, DELETE_CURRENT_USER} from '../constants'
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import shortid from 'shortid'
const robohash = `https://robohash.p.mashape.com/index.php?text=${shortid.generate()}`;

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

export function setRoboHashThumbnail(id, X_MASHAPE_KEY){
  return dispatch => {
    return axios.get(robohash, {
      headers: {
        'X-Mashape-Key': X_MASHAPE_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res => {
      return dispatch(editCurrentUser(id, {
        user: {
          thumbnail_url: res.data.imageUrl
        }
      }));
    })
    .catch(err => {
      debugger;
      return err; 
    });
  }
}