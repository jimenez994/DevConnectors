import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './Types';

export const registerUser = userData => dispatch => {
  axios.post('api/register', userData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
}

export const loginUser = userData => dispatch => {
  axios.post(`api/login`, userData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

// set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}