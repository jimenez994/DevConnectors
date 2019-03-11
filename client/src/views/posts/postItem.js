import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

class PostItem extends Component {
  render () {
    const {post} = this.props;
    return (
      <Card>
        <CardContent>
          <Typography>
            {post.text}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

PostItem.propTypes = {
post: PropTypes.object.isRequired,
}

export default PostItem;