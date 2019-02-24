import { combineReducers } from 'redux';

import User from './users/UserReducer';
import Auth from './auth/AuthReducer';
import Album from './items/AlbumReducer';
import Post from './items/PostReducer';

export default combineReducers({ 
  User,
  Auth,
  Album,
  Post,
});