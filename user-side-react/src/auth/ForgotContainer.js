import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { forgot } from './AuthAction';
import ForgotView from './ForgotView';

class LoginContainer extends PureComponent {
  render() {
    return (
      <ForgotView { ...this.props } onLogin={this.props.forgot} />
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
  forgot,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);