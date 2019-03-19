import axios from 'axios';
import { GET_POSTS, POST_LOADING, GET_ERRORS, ADD_POST, CLEAR_ERRORS, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from './Types';

// get all posts
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

// create a new post
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

// Delete a post by id
export const deletePost = (postId) => dispatch => {
  axios.delete(`api/deletePost/${postId}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    })
    .catch(err => {
      console.log(err);
    })
}

// Add comment 
export const createComment = (postId, userInputs) => dispatch => {  
  axios.post( `api/addComment/${postId}`, userInputs)
    .then(res => {
      res.data._post = postId
      console.log(res.data);
      
      // dispatch({
      //   type: ADD_COMMENT,
      //   payload: res.data
      // })
    })
    .catch(err => {
      console.log(err.response.data);
      
    })
}

// Delete comment 
export const deleteComment = (postId, commentId) => dispatch => {
  axios.delete(`api/deleteComment/${postId}/${commentId}`)
    .then(res => {
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response);
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