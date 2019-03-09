import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getPosts} from 'actions/postActions';
import {connect} from 'react-redux';
import PostForm from './postForm';
import { Grid } from '@material-ui/core';
class Posts extends Component {
  componentDidMount = () => {
    this.props.getPosts()
  }
  render () {
    const { posts } = this.props.posts;
    console.log(posts);
    
    return (
      <Grid container justify="center">
        <PostForm/>
      </Grid>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps, {getPosts})(Posts);