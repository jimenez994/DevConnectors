import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: userReducer,
  errors: errorReducer,
  profile: profileReducer
})