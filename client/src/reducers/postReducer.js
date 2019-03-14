import { GET_POSTS, POST_LOADING, ADD_POST, DELETE_POST } from "../actions/Types";

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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => post._id !== action.payload
        )
      }
  
    default:
      return state
  }
}