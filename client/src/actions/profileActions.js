import axios from 'axios';
import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING , GET_ERRORS} from "./Types";
import { userInfo } from 'os';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setLoading());
  axios.get('api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
}
// Get users profiles
export const getProfiles = () => dispatch => {
  dispatch(setLoading());
  axios.get('api/profiles')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    })
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
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}