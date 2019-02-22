import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserView from './UserView';
import { addItem, resetItem, searchUsers, deleteUser } from './UserAction';

class UserContainer extends PureComponent {
  componentDidMount = () => {
    this.props.searchUsers();
  }

  render() {
    return (
      <UserView
        {...this.props}
        onAdd={ this.props.addItem }
        onReset={ this.props.resetItem }
        onSearch={ this.props.searchUsers }
        onDelete={ this.props.deleteUser } />
    )
  }
}

const mapStateToProps = state => ({
  row: state.User.row,
  rows: state.User.rows,
  pageable: state.User.pageable,
  messages: state.User.messages,
  failures: state.User.failures,
  loading: state.User.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addItem,
  resetItem,
  searchUsers,
  deleteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);