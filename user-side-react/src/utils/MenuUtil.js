import HomeContainer from '../home/HomeContainer';
import UserContainer from '../users/UserContainer';
import UserContainerForm from '../users/UserContainerForm';
import LoginContainer from '../auth/LoginContainer';
import ForgotContainer from '../auth/ForgotContainer';
import ItemContainer from '../items/ItemContainer';

import { logout } from './SecurityUtil';

export const onSelect = (key, history) => {
  switch (key) {
    case 1:
      history.push('/users'); 
      break;
    case 2:
      logout();
      history.push('/auth/signin');
      break;
    case 3:
      history.push('/items'); 
      break;
    case 4:
      history.push('/');
      break;
    default:
      break;
  }
} 


export const routes = [
  { type: 'protected', mode: "view", exact: true, path: "/", component: HomeContainer },

  { type: 'anonymous', mode: "auth", exact: true, path: "/auth/signin", component: LoginContainer },
  { type: 'anonymous', mode: "auth", exact: true, path: "/auth/forgot", component: ForgotContainer },

  { type: 'protected', mode: "view", exact: true, path: "/users", component: UserContainer },
  { type: 'protected', mode: "edit", exact: true, path: "/users/:id/edit", component: UserContainerForm },
  { type: 'anonymous', mode: "new", exact: true, path: "/register", component: UserContainerForm },
  { type: 'protected', mode: "view", exact: true, path: "/items", component: ItemContainer },
];