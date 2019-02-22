import CRUDAction from '../abstract/CRUDAction';

const Action = CRUDAction('users', '/api/users');

export const addItem = Action.addItem;
export const resetItem = Action.resetItem;
export const searchUsers = Action.search;
export const getUser = Action.get;
export const postUser = Action.post;
export const putUser = Action.put;
export const deleteUser = Action.del;