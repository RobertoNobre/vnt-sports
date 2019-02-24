import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewUserViewForm from './NewUserViewForm';
import { resetItem, getUser, postUser, putUser, deleteUser } from './UserAction';

class NewUserFormContainer extends PureComponent {
  componentDidMount = () => {
    const { mode, getUser, history } = this.props;
    if (mode === 'edit') {
      const { id } = this.props.match.params;
      if (!id) {
        history.goBack(0);
      }
      getUser(id)
    }
  }

  render() {
    return (
      <NewUserViewForm
        {...this.props}
        onReset={ this.props.resetItem }
        onGet={ this.props.getUser }
        onPost={ this.props.postUser }
        onPut={this.props.putUser }
        onDelete={ this.props.deleteUser }
        isEdit={ this.props.mode === 'edit' } />
    )
  }
}

const mapStateToProps = state => ({
  row: state.User.row,
  messages: state.User.messages,
  failures: state.User.failures,
  loading: state.User.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetItem,
  getUser,
  postUser,
  putUser,
  deleteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewUserFormContainer);