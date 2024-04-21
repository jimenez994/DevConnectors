import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentItem extends Component {
  render () {
    const {comment} = this.props;
    return (
      <div>
        {comment.text}
      </div>
    )
  }
}

CommentItem.propTypes = {
comment: PropTypes.object.isRequired
}

export default CommentItem