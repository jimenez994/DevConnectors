import { GET_POSTS, POST_LOADING, ADD_POST } from "../actions/Types";

const initialState = {
  loading: false,
  posts: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload,...state.posts]
      }
  
    default:
      return state
  }
}