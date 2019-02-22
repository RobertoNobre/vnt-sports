import UserContainer from '../users/UserContainer';
import UserContainerForm from '../users/UserContainerForm';

export const onSelect = (key, history) => {
  switch (key) {
    case 1:
      history.push('/users'); 
      break;
    case 4:
      history.push('/');
      break;
    default:
      break;
  }
}

export const routes = [
  { type: 'protected', mode: "view", exact: true, path: "/users", component: UserContainer },
  { type: 'protected', mode: "edit", exact: true, path: "/users/:id/edit", component: UserContainerForm },
  { type: 'protected', mode: "new" , exact: true, path: "/users/new", component: UserContainerForm },
];