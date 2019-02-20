import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  getCurrentProfile,
  createOrUpdateProfile
} from "actions/profileActions";
import { Grid, Typography, Link, Paper } from "@material-ui/core";
import Loading from "views/common/Loading";
import isEmpty from "../../validation/is-empty";
import styles from "assets/jss/views/dashboardStyle";
import { withStyles } from "@material-ui/core/styles";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };
  onClick = () => {
    this.props.createOrUpdateProfile(
      { username: "", profecionalStatus: "", skills: "" },
      this.props.history
    );
  };
  render() {
    const {classes} = this.props
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let content;
    if (profile === null || loading === true) {
      content = <Loading />;
    } else {
      if (isEmpty(profile)) {
        content = (
          <Link underline="none" component={RouterLink} to="/profileForm">
            Create Profile
          </Link>
        );
      } else {
        content = (
          <div>
            some profile info ...
            <Link underline="none" component={RouterLink} to="/profileForm">
              Update Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <Grid container justify="center" className={classes.dashboardContainer}>
        <Grid item md={8} sm={10} xs={12} lg={8} >
          <Paper className={classes.paper}>
            <Typography>Welcome back, {user.firstName}</Typography>
            {content}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createOrUpdateProfile }
)(withStyles(styles)(Dashboard));
