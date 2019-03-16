import React, { Component } from 'react';
import PropTypes, { object, string } from 'prop-types';
import {connect} from 'react-redux';
import isEmpty from 'validation/is-empty';
import {createComment} from 'actions/postActions';
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField
} from "@material-ui/core";
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
    console.log(this.props);
    
    console.log(postId );
    console.log(this.state.commentInputs);
    
    
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