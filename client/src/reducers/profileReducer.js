// import isEmpty from '../validation/is-empty';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_LOADING_EDUCATION,
  GET_PROFILES,
  ADD_EDUCATION
} from "actions/Types";

const initialState = {
  loading: false,
  educationLoading: false,
  profile: null,
  profiles: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case ADD_EDUCATION:
      return {
        ...state,
        educationLoading: false,
        profile: {
          ...state.profile,
          _education:[
            ...state.profile._education, action.payload
          ]
        }
        // _education: [action.payload, ...state._education]
      };
    case SET_LOADING_EDUCATION:
      return {
        ...state,
        educationLoading: true
      }
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
