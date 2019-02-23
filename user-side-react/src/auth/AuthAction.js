import API from '../utils/API';

import { login } from '../utils/SecurityUtil';
import { request, success, failure } from '../utils/ActionUtil';

/**
 * SIGNIN
 */

export const SIGNIN_POST_REQUEST = 'signin/post/request';
export const SIGNIN_POST_SUCCESS = 'signin/post/success';
export const SIGNIN_POST_FAILURE = 'signin/post/failure';

export const signin = (data) => {
  return dispatch => {
    dispatch(request(SIGNIN_POST_REQUEST));
    return API.post('/auth/signin', data)
      .then(resp => dispatch(success(SIGNIN_POST_SUCCESS, resp.data)))
      .then(resp => {
        login(resp.data.data.tokenType, resp.data.data.accessToken);
        return resp;
      })
      .catch(errors => dispatch(failure(SIGNIN_POST_FAILURE, errors)));
  }
}

//TODO: not implemented
export const forgot = (data) => {}

//TODO: not implemented
export const reset = (data) => {}
