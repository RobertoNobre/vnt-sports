import HomeContainer from '../home/HomeContainer';
import UserContainer from '../users/UserContainer';
import UserContainerForm from '../users/UserContainerForm';
import LoginContainer from '../auth/LoginContainer';
import ForgotContainer from '../auth/ForgotContainer';
import ResetContainer from '../auth/ResetContainer';

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
  { type: 'anonymous', mode: "auth", exact: true, path: "/auth/reset", component: ResetContainer },

  { type: 'protected', mode: "view", exact: true, path: "/users", component: UserContainer },
  { type: 'protected', mode: "edit", exact: true, path: "/users/:id/edit", component: UserContainerForm },
  { type: 'protected', mode: "new" , exact: true, path: "/users/new", component: UserContainerForm },
];