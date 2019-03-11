import React, { Component } from "react";
import PropTypes from "prop-types";
import { getPosts } from "actions/postActions";
import { connect } from "react-redux";
import PostForm from "./postForm";
import { Grid } from "@material-ui/core";
import PostFeed from "./postFeed";
import isEmpty from "validation/is-empty";
class Posts extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    const { posts } = this.props.posts;
    let contentFeed;
    if (!isEmpty(posts)) {
      contentFeed = (
        <Grid item sm={10}>
          <PostFeed posts={posts} />
        </Grid>
      );
    } else {
      contentFeed = <p>Loading</p>;
    }
    return (
      <Grid container justify="center">
        <PostForm />
        {contentFeed}
      </Grid>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
