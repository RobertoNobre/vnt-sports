import { 
  SIGNIN_POST_REQUEST, 
  SIGNIN_POST_SUCCESS, 
  SIGNIN_POST_FAILURE 
  } from './AuthAction';

const initialState = {
  row: {},
  failures: [],
  messages: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    /**
      * POST
      */
    case SIGNIN_POST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case SIGNIN_POST_SUCCESS:
      return {
        ...state,
        row: action.data.data,
        messages: action.data.messages,
        loading: false,
      }
    case SIGNIN_POST_FAILURE:
      return {
        ...state,
        failures: action.errors,
        loading: false
      }

    // others
    default:
      return state;
  }
}
