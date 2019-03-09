import axios from 'axios';
import { GET_POSTS, POST_LOADING, GET_ERRORS } from './Types';

export const getPosts = () => dispatch => {
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
  axios.post('api/createPost', postInputs)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err.response.data))
}

export const setLoading = () => {
  return {
    type: POST_LOADING
  }
}