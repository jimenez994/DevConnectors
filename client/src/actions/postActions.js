import axios from 'axios';
import { GET_POSTS, POST_LOADING, GET_ERRORS, ADD_POST, CLEAR_ERRORS } from './Types';

export const getPosts = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  axios.get("api/getPosts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
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

export const createPost = (postInputs) => dispatch => {
  dispatch(clearErrors());
  axios.post('api/createPost', postInputs)
    .then(res => {
      dispatch({
        type: ADD_POST,
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

export const setLoading = () => {
  return {
    type: POST_LOADING
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}