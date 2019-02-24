import CRUDAction from '../abstract/CRUDAction';

const Action = CRUDAction('posts', '/posts');

export const getPosts = Action.get;