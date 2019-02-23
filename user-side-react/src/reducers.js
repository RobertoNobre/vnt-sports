import { combineReducers } from 'redux';

import User from './users/UserReducer';
import Auth from './auth/AuthReducer';

export default combineReducers({ 
  User,
  Auth,
});