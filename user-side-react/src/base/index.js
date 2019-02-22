import React, { PureComponent, Fragment } from 'react';

import Menu from './Menu';

class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <Menu {...this.props} />
        {this.props.children}
      </Fragment>
    );
  }
}

export default Index;

