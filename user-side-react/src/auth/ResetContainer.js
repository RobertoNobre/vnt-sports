import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { reset } from './AuthAction';
import ResetView from './ResetView';

class LoginContainer extends PureComponent {
  render() {
    return (
      <ResetView { ...this.props } onLogin={this.props.reset} />
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
  reset,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);