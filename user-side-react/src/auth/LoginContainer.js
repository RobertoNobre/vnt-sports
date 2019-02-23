import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signin } from './AuthAction';
import LoginView from './LoginView';

class LoginContainer extends PureComponent {
  render() {
    return (
      <LoginView { ...this.props } onLogin={this.props.signin} />
    );
  }
}

const mapStateToProps = state => ({
  row: state.Auth.row,
  messages: state.Auth.messages,
  failures: state.Auth.failures,
  loading: state.Auth.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);