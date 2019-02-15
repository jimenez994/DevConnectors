// import isEmpty from '../validation/is-empty';
import { GET_PROFILE, PROFILE_LOADING, GET_PROFILES } from 'actions/Types';

const initialState = {
  loading: false,
  profile: null,
  profiles: null
}

export default function (state=initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      }
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      }
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}