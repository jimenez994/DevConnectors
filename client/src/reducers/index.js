import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: userReducer,
  errors: errorReducer,
  profile: profileReducer,
  posts: postReducer,
})