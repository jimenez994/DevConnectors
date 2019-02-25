// import isEmpty from '../validation/is-empty';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_LOADING_EDUCATION,
  GET_PROFILES,
  ADD_EDUCATION,
  SET_EDUCATION_COMPLETION
} from "actions/Types";
import {
  DELETE_EDUCATION,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  SET_EXPERIENCE_COMPLETION,
  SET_LOADING_EXPERIENCE
} from "../actions/Types";

const initialState = {
  loading: false,
  educationLoading: false,
  educationCompleted: true,
  experienceLoading: false,
  experienceCompleted: true,
  profile: null,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };

    //Education
    case ADD_EDUCATION:
      return {
        ...state,
        educationLoading: false,
        educationCompleted: true,
        profile: {
          ...state.profile,
          _education: [...state.profile._education, action.payload]
        }
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        profile: {
          ...state.profile,
          _education: state.profile._education.filter(
            education => education._id !== action.payload
          )
        }
      };
    case SET_EDUCATION_COMPLETION:
      return {
        ...state,
        educationCompleted: action.payload
      };
    case SET_LOADING_EDUCATION:
      return {
        ...state,
        educationLoading: action.payload
      };
    //experience
    case ADD_EXPERIENCE:
      return {
        ...state,
        experienceLoading: false,
        experienceCompleted: true,
        profile: {
          ...state.profile,
          _experience: [...state.profile._experience, action.payload]
        }
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        profile: {
          ...state.profile,
          _experience: state.profile._experience.filter(
            experience => experience._id !== action.payload
          )
        }
      };
    case SET_EXPERIENCE_COMPLETION:
      return {
        ...state,
        experienceCompleted: action.payload
      };
    case SET_LOADING_EXPERIENCE:
      return {
        ...state,
        experienceLoading: action.payload
      };
    default:
      return state;
  }
}
