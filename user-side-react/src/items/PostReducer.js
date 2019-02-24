import {
    GET_REQUEST, GET_SUCCESS, GET_FAILURE,
    } from '../utils/ActionUtil';
  
  const initialState = {
      posts: [],
      failures: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case GET_REQUEST('posts'):
        return { ...initialState }
      case GET_SUCCESS('posts'):
        return {
          ...initialState,
          posts: action.data.results,
        }
      case GET_FAILURE('posts'):
        return {
          ...state,
          failures: action.errors,
        }
  
      // others
      default:
        return state;
    }
  }
  