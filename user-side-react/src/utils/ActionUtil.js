export const SEARCH_REQUEST = (clazz) => `${clazz}/search/request`;
export const SEARCH_SUCCESS = (clazz) => `${clazz}/search/success`;
export const SEARCH_FAILURE = (clazz) => `${clazz}/search/failure`;

export const GET_REQUEST = (clazz) => `${clazz}/get/request`;
export const GET_SUCCESS = (clazz) => `${clazz}/get/success`;
export const GET_FAILURE = (clazz) => `${clazz}/get/failure`;

export const POST_REQUEST = (clazz) => `${clazz}/post/request`;
export const POST_SUCCESS = (clazz) => `${clazz}/post/success`;
export const POST_FAILURE = (clazz) => `${clazz}/post/failure`;

export const PUT_REQUEST = (clazz) => `${clazz}/put/request`;
export const PUT_SUCCESS = (clazz) => `${clazz}/put/success`;
export const PUT_FAILURE = (clazz) => `${clazz}/put/failure`;

export const DELETE_REQUEST = (clazz) => `${clazz}/delete/request`;
export const DELETE_SUCCESS = (clazz) => `${clazz}/delete/success`;
export const DELETE_FAILURE = (clazz) => `${clazz}/delete/failure`;

export const ADD_ITEM   = (clazz, item) => `${clazz}/add/${item}`;
export const RESET_ITEM = (clazz, item) => `${clazz}/reset/${item}`;


// commons operation
export const request = (type) => ({ type });
export const success = (type, data) => ({ type, data });
export const failure = (type, errors) => ({ type, errors });