import React, { Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './commentItem';

class CommentFeed extends Component {
  render () {
    const {comments} = this.props;
    return comments.map(comment => <CommentItem key={comment._id} comment={comment}/>)
  }
}

CommentFeed.propTypes = {
comments: PropTypes.array.isRequired
}

export default CommentFeed;