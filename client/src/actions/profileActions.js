import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_EDUCATION,
  SET_EDUCATION_COMPLETION
} from "./Types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};
// Get users profiles
export const getProfiles = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("api/profiles")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Create or update profile
export const createOrUpdateProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/createOrUpdateProfile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addEducation = educationInput => dispatch => {
  axios
    .post(`api/addEducation`, educationInput)
    .then(res => {
      dispatch({type: CLEAR_ERRORS})
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data
      });
    })
    .catch(err => {
      setEducationCompletion(true)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const setEducationCompletion = input => dispatch => {
  dispatch({
    type: SET_EDUCATION_COMPLETION,
    payload: input
  })
}

export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
