import React, { Fragment, PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { routes } from './utils/MenuUtil';

import AnonymousRoute from './commons/AnonymousRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle)
library.add(faQuestion)
library.add(faHome)




window.jQuery = window.$ = $;
require('bootstrap');

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          { 
            !!routes && routes.map(route => {
              return <AnonymousRoute key={route.path} mode={route.mode} exact={route.exact} path={route.path} component={route.component} />
            }) 
          }
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
