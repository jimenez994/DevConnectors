import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER,LOGOUT_USER, GET_ERRORS } from './Types';

// register user
export const registerUser = userData => dispatch => {
  axios.post('api/register', userData)
    .then(res => {
      const {token} = res.data;
      // Set current user
      dispatch(setCurrentUser(token));
    })
    .catch(err => console.log(err.response.data))
}

// login user
export const loginUser = userData => dispatch => {
  axios.post(`api/login`, userData)
    .then(res => {
      const {token} = res.data;
      // Set current user
      dispatch(setCurrentUser(token));
    })
    .catch(err => console.log(err.response.data))
}

export const logoutUser = () => dispatch => {
  setAuthToken(false);
  localStorage.removeItem('jwtToken');
  dispatch({type: LOGOUT_USER});
}



// set current user
export const setCurrentUser = token => {
  // Save to localStorage
  // Set token to ls
  localStorage.setItem('jwtToken', token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}