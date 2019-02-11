import axios from 'axios';
import {GET_PROFILE, GET_ERRORS} from "./Types";
import { userInfo } from 'os';

// Get users profile
export const getCurrentProfile = () => dispatch => {
  axios.get('api/profile')
    .then(res => console.log(res))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Create or update profile
export const createOrUpdateProfile = (profileData, history) => dispatch => {
  axios.post('/api/createOrUpdateProfile', profileData)
    .then(res => {
      history.push('/dashboard')
      console.log(res)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const createProfile = (profileData, history) => dispatch => {
  axios('api/createOrUpdateProfile', userInfo)
    .then(res => history.push('/dashboard'))
    .catch(err => console.log(err.response.data))
}