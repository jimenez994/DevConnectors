import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

class Experience extends Component {
  
  render() {
    // const {}
    console.log(this.props);
    return (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        experience section
      </Grid>
    );
  }
}

Experience.propTypes = {
  educationArray: PropTypes.array.isRequired
};

export default Experience;
