import {
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE,
  GET_REQUEST, GET_SUCCESS, GET_FAILURE,
  POST_REQUEST, POST_SUCCESS, POST_FAILURE,
  PUT_REQUEST, PUT_SUCCESS, PUT_FAILURE,
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE,
  ADD_ITEM, RESET_ITEM
  } from '../utils/ActionUtil';

const initialState = {
  row: {},
  rows: [],
  pageable: {
    activePage: 0,
    itemsCountPerPage: 10,
    totalItemsCount: 0,
    pageRangeDisplayed: 0,
  },
  failures: [],
  messages: [],
  loading: false,
}

export default (clazz) => (state = initialState, action) => {
  switch (action.type) {
    // add item
    case ADD_ITEM(clazz, !!action.data && !!action.data.name ? action.data.name : ''):
      return { ...state, [action.data.name]: action.data.data[action.data.name] };

    // reset item
    case RESET_ITEM(clazz, !!action.data ? action.data : ''):
      return { ...state, [action.data]: initialState[action.data] };

    /**
      * SEARCH
      */
    case SEARCH_REQUEST(clazz):
      return { ...initialState, loading: true }
    case SEARCH_SUCCESS(clazz):
      return {
        ...initialState,
        rows: action.data.results,
        messages: action.data.messages,
        pageable: {
          activePage: action.data.pagination.pageNumber,
          itemsCountPerPage: action.data.pagination.pageSize,
          totalItemsCount: action.data.pagination.totalElements,
          pageRangeDisplayed: action.data.pagination.totalPages,
        },
        loading: false,
      }
    case SEARCH_FAILURE(clazz):
      return {
        ...state,
        failures: action.errors,
        loading: false
      }

    /**
      * GET
      */
    case GET_REQUEST(clazz):
      return { ...initialState, loading: true }
    case GET_SUCCESS(clazz):
      return {
        ...initialState,
        row: action.data.results,
        messages: action.data.messages,
        loading: false,
      }
    case GET_FAILURE(clazz):
      return {
        ...state,
        failures: action.errors,
        loading: false
      }

    /**
      * POST
      */
    case POST_REQUEST(clazz):
      return {
        ...initialState,
        loading: true
      }
    case POST_SUCCESS(clazz):
      return {
        ...state,
        messages: action.data.messages,
        loading: false,
      }
    case POST_FAILURE(clazz):
      return {
        ...state,
        failures: action.errors,
        loading: false
      }

    /**
      * PUT
      */
    case PUT_REQUEST(clazz):
      return {
        ...state,
        messages: initialState.messages,
        failures: initialState.failures,
        loading: true
      }
    case PUT_SUCCESS(clazz):
      return {
        ...state,
        row: action.data.data,
        messages: action.data.messages,
        loading: false,
      }
    case PUT_FAILURE(clazz):
      return {
        ...state,
        failures: action.errors,
        loading: false
      }

    /**
      * DELETE
      */
    case DELETE_REQUEST(clazz):
      return {
        ...initialState,
        messages: initialState.messages,
        failures: initialState.failures,
        loading: true
      }
    case DELETE_SUCCESS(clazz):
      return {
        ...initialState,
        row: action.data.data,
        messages: ["Deletado com sucesso!"],
        loading: false,
      }
    case DELETE_FAILURE(clazz):
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
