import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_EDUCATION,
  SET_EDUCATION_COMPLETION,
  DELETE_EDUCATION,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  SET_EXPERIENCE_COMPLETION
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
// Get profile by username
export const getProfileByUsername = username => dispatch => {
  dispatch(setLoading());  
  axios
    .get(`/api/profile/${username}`)
    .then(res => {
      console.log(res.data);
      
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
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
// Add Education
export const addEducation = educationInput => dispatch => {
  axios
    .post(`api/addEducation`, educationInput)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data
      });
    })
    .catch(err => {
      setEducationCompletion(true);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete Education
export const deleteEducation = educationId => dispatch => {
  axios
    .delete(`api/deleteEducation/${educationId}`)
    .then(res => {
      dispatch({
        type: DELETE_EDUCATION,
        payload: educationId
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const setEducationCompletion = input => dispatch => {
  dispatch({
    type: SET_EDUCATION_COMPLETION,
    payload: input
  });
};

// Add Experience
export const addExperience = experienceInput => dispatch => {
  axios
    .post(`api/addExperience`, experienceInput)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: ADD_EXPERIENCE,
        payload: res.data
      });
    })
    .catch(err => {
      setExperienceCompletion(true);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete Experience
export const deleteExperience = experienceId => dispatch => {
  axios
    .delete(`api/deleteExperience/${experienceId}`)
    .then(res => {
      dispatch({
        type: DELETE_EXPERIENCE,
        payload: experienceId
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const setExperienceCompletion = input => dispatch => {
  dispatch({
    type: SET_EXPERIENCE_COMPLETION,
    payload: input
  });
};

export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
