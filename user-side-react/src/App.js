import React, { Fragment, PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { routes } from './utils/MenuUtil';

import AnonymousRoute from './commons/AnonymousRoute';
import ProtectedRoute from './commons/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUserCircle, 
  faQuestion, 
  faHome, 
  faPuzzlePiece, 
  faTrophy, 
  faMapSigns,
  faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faLifeRing, faSmile } from '@fortawesome/free-regular-svg-icons';


library.add(faUserCircle)
library.add(faQuestion)
library.add(faHome)
library.add(faPuzzlePiece)
library.add(faTrophy)
library.add(faMapSigns)
library.add(faLifeRing)
library.add(faHeartbeat)
library.add(faSmile)

window.jQuery = window.$ = $;
require('bootstrap');

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          { 
            !!routes && routes.map(route => {
              if (route.type === 'protected') {
                return <ProtectedRoute key={route.path} mode={route.mode} exact={route.exact} path={route.path} component={route.component} />
              } else {
                return <AnonymousRoute key={route.path} mode={route.mode} exact={route.exact} path={route.path} component={route.component} />
              }
            }) 
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
