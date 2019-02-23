import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

class HomeView extends PureComponent {
  render() {
    return (
      <Fragment>
        <Row>
          <Col mdOffset={1}>
            <h1>Welcome to Venturus Sports :)</h1>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default HomeView;