import React, { PureComponent, Fragment } from 'react';
import { Alert } from 'react-bootstrap';

class Message extends PureComponent {
  messages = (msg) => (<Fragment key={msg}>{msg}<br/></Fragment>);

  render() {
    const { failures, bsStyleFailures, messages, bsStyleMessges} = this.props;
    return (
      <Fragment>
        {
          !!messages && messages.length > 0 &&
          (<Fragment>
            <Alert bsStyle={bsStyleMessges || 'info'} {...this.props}>
              { messages.map(m => this.messages(m)) }
            </Alert>
          </Fragment>)
        }
        {
          !!failures && failures.length > 0 &&
          (<Fragment>
            <Alert bsStyle={bsStyleFailures || 'danger'} {...this.props}>
              { failures.map(f => this.messages(f)) }
            </Alert>
          </Fragment>)
        }
      </Fragment>
    )
  }
}

export default Message;