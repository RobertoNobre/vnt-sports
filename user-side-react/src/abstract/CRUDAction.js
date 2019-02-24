import API from '../utils/API';
import {
  request, success, failure,
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE,
  GET_REQUEST, GET_SUCCESS, GET_FAILURE,
  POST_REQUEST, POST_SUCCESS, POST_FAILURE,
  PUT_REQUEST, PUT_SUCCESS, PUT_FAILURE,
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE,
  ADD_ITEM, RESET_ITEM,
  } from '../utils/ActionUtil';


export default (clazz, endpoint) => ({

  /**
   * Add Item
   */
  addItem: (name, data) => {
    return dispatch => {
      const obj = { name, data: { [name]: data} };
      dispatch(success(ADD_ITEM(clazz, name), obj));
    }
  },

  /*
   * Reset Item
   */
  resetItem: (name) => {
    return dispatch => {
      dispatch(success(RESET_ITEM(clazz, name), name));
    }
  },

  /**
   * SEARCH
   */
  search: (pageNumber, pageSize, search) => {
    pageNumber = pageNumber || 0;
    pageSize = pageSize || 100;
    search = search || '';

    return dispatch => {
      dispatch(request(SEARCH_REQUEST(clazz)));
      return API.get(`${endpoint}?page=${pageNumber}&size=${pageSize}&search=${search}`)
        .then(resp => dispatch(success(SEARCH_SUCCESS(clazz), resp.data)))
        .catch(errors => dispatch(failure(SEARCH_FAILURE(clazz), errors)));
    }
  },

  /**
   * GET
   */
  get: (id) => {
    return dispatch => {
      dispatch(request(GET_REQUEST(clazz)));
      return API.get(`${endpoint}/${id}`)
        .then(resp => dispatch(success(GET_SUCCESS(clazz), resp.data)))
        .catch(errors => dispatch(failure(GET_FAILURE(clazz), errors)));
    }
  },

  /**
   * POST
   */
  post: (data) => {
    return dispatch => {
      dispatch(request(POST_REQUEST(clazz)));
      return API.post(`${endpoint}`, data)
        .then(resp => dispatch(success(POST_SUCCESS(clazz), resp.data)))
        .catch(errors => dispatch(failure(POST_FAILURE(clazz), errors)));
    }
  },

  /**
   * PUT
   */
  put: (id, data) => {
    return dispatch => {
      dispatch(request(PUT_REQUEST(clazz)));
      return API.put(`${endpoint}/${id}`, data)
        .then(resp => dispatch(success(PUT_SUCCESS(clazz), resp.data)))
        .catch(errors => dispatch(failure(PUT_FAILURE(clazz), errors)));
    }
  },

  /**
   * DELETE
   */
  del: (id) => {
    return dispatch => {
      dispatch(request(DELETE_REQUEST(clazz)));
      return API.delete(`${endpoint}/${id}`)
        .then(resp => dispatch(success(DELETE_SUCCESS(clazz), resp)))
        .catch(errors => dispatch(failure(DELETE_FAILURE(clazz), errors)));
    }
  }

})