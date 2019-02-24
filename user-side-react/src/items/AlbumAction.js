import CRUDAction from '../abstract/CRUDAction';

const Action = CRUDAction('albums', '/albums');

export const getAlbums = Action.get;