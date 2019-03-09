import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from 'validation/is-empty';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@material-ui/core";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postInputs: {
        text: ""
      },
      errors: {}
    };
  }
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.postInputs);
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      postInputs: {
        ...prevState.postInputs,
        [e.target.name]: e.target.value
      }
    }));
  };
  render() {
    return (
      <Grid item sm={10} style={{ marginTop: "10px" }}>
        <Card>
          <CardContent>
            <form onSubmit={this.onSubmit}>
              <TextField
                error={!isEmpty(this.state.errors.text)}
                helperText={this.state.errors.text}
                fullWidth
                multiline
                onChange={this.onChange}
                label="What's in your mind?"
                value={this.state.postInputs.text}
                name="text"
              />
              <Button type="submit">Post</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

PostForm.propTypes = {};

export default PostForm;
