import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './Types';

export const registerUser = userData => dispatch => {
  axios.post('api/register', userData)
    .then(res => console.log(res))
    .catch(err => console.log(err.response.data))
}