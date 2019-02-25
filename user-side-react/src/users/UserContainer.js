import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserView from './UserView';
import { addItem, resetItem, searchUsers, deleteUser } from './UserAction';
import jwt from 'jsonwebtoken';

class UserContainer extends PureComponent {
  componentDidMount = () => {
    this.props.searchUsers(0, 100, jwt.decode(localStorage.getItem('id_token')).id.id);
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
  rows: state.User.rows.map(
    item => ({
      ...item, 
      photos: Math.floor((Math.random() * 100) + 1),
      albums: Math.floor((Math.random() * 100) + 1),
      posts: Math.floor((Math.random() * 100) + 1),
    })),
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