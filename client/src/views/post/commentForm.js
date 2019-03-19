import { Button, Grid, TextField } from "@material-ui/core";
import { createComment } from 'actions/postActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInputs: {
        text: ""
      }
    }
  }
  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      commentInputs: {
        ...prevState.commentInputs,
        [e.target.name]: e.target.value
      }
    }));
  }
  onSubmit = e => {
    e.preventDefault();
    const {postId} = this.props
    this.props.createComment(postId, this.state.commentInputs);
    this.setState(prevState => ({
      ...prevState,
      commentInputs: {
        ...prevState.commentInputs,
        text: ""
      }
    }));
  }
  render () {
    return (
      <div>
        <Grid>
        <form onSubmit={this.onSubmit}>
              <TextField
                // error={!isEmpty(this.state.errors.text)}
                // helperText={this.state.errors.text}
                fullWidth
                multiline
                onChange={this.onChange}
                // label="What's in your mind?"
                value={this.state.commentInputs.text}
                name="text"
              />
              <Button type="submit">Comment</Button>
            </form>
        </Grid>
      </div>
    )
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, {createComment})(CommentForm)