import {
    GET_REQUEST, GET_SUCCESS, GET_FAILURE,
    } from '../utils/ActionUtil';
  
  const initialState = {
    albums: [],
      failures: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case GET_REQUEST('albums'):
        return { ...initialState }
      case GET_SUCCESS('albums'):
        return {
          ...initialState,
          albums: action.data.results,
        }
      case GET_FAILURE('albums'):
        return {
          ...state,
          failures: action.errors,
        }
  
      // others
      default:
        return state;
    }
  }
  