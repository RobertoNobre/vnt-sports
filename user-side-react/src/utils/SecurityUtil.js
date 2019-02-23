import jwt from 'jsonwebtoken';

const ID_TOKEN = 'id_token';
const TP_TOKEN = 'tp_token';

const getObjToken = () => {
  const idToken = localStorage.getItem('id_token');
  const tpToken = localStorage.getItem('tp_token');

  if (!idToken || !tpToken) {
    logout();
    return;
  }

  try {
    var decoded = jwt.decode(idToken, {complete: true});
    if (!decoded) {
      logout();
      return;
    }
  } catch (error) {
    console.error(error);
    logout();
    return;
  }

  return { tokenType: tpToken, accessToken: idToken };
}

const clearCredentials = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(TP_TOKEN);
}

const setCredentials = (tokenType, accessToken) => {
  localStorage.setItem(ID_TOKEN, accessToken);
  localStorage.setItem(TP_TOKEN, tokenType);
}

export const isLogged = () => (!!getToken());

export const getToken = () => {
  const token = getObjToken();
  if (!token) {
    return;
  }
  return `${token.tokenType} ${token.accessToken}`;
}

export const login = (tokenType, accessToken) => {
  setCredentials(tokenType, accessToken);  
}

export const logout = () => {
  clearCredentials();
}

export const getUser = () => {
  const idToken = localStorage.getItem('id_token');
  try {
    var decoded = jwt.decode(idToken, {complete: true});
    if (!decoded || !decoded.payload || !decoded.payload.user) {
      logout();
      return;
    }
    return decoded.payload.user;

  } catch (error) {
    console.error(error);
    logout();
    return;
  }
}
