import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Grid, Typography } from '@material-ui/core';


class Dashboard extends Component {
  render () {
    const {user} = this.props.auth
    return (
      <Grid container>
        <Typography>
          Welcome back, {user.firstName}
        </Typography>
      </Grid>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);