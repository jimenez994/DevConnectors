// import isEmpty from '../validation/is-empty';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_LOADING_EDUCATION,
  GET_PROFILES,
  ADD_EDUCATION,
  SET_EDUCATION_COMPLETION
} from "actions/Types";

const initialState = {
  loading: false,
  educationLoading: false,
  educationCompleted: true,
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
    case SET_EDUCATION_COMPLETION:
      return {
        ...state,
        educationCompleted: action.payload
      }
    case SET_LOADING_EDUCATION:
        return {
          ...state,
          educationLoading: action.payload
        };
    default:
      return state;
  }
}
