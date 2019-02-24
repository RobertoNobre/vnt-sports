import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import ItemView from './ItemView';
import { getAlbums } from './AlbumAction';
import { getPosts } from './PostAction';

class ItemContainer extends PureComponent {
  componentDidMount = () => {
    var decoded = jwt.decode(localStorage.getItem('id_token'), {complete: true});
    this.props.getAlbums(decoded.payload.id.id);
    this.props.getPosts(decoded.payload.id.id);
  }

  render() {
    return (
      <ItemView
        {...this.props}
        ongetAlbums={ this.props.getAlbums }
        ongetPosts={ this.props.getPosts } />
    )
  }
}

const mapStateToProps = state => ({
  albums: state.Album.albums,
  posts: state.Post.posts,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAlbums,
  getPosts,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);