import axios from 'axios'

export default function setAuthorizationToken(token){
  // set headers on each request
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }else{
    delete axios.defaults.headers.common['Authorization'];
  }
}