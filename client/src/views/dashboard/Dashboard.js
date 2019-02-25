import { Avatar, Card, CardContent, Grid, Link, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { createOrUpdateProfile, getCurrentProfile } from "actions/profileActions";
import styles from "assets/jss/views/dashboardStyle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { IoIosAdd } from "react-icons/io";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Loading from "views/common/Loading";
import EducationForm from "views/dashboard/education/educationForm";
import isEmpty from "../../validation/is-empty";
import EducationFeed from "./education/educationFeed";


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
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let content;

    let educationContent;
    let experienceContent;
    // Main Content
    if (profile === null || loading === true) {
      content = <Loading />;
    } else {
      if (isEmpty(profile)) {
        content = (
          <Grid
            container
            justify="center"
            className={classes.dashboardContainer}
          >
            <Grid item md={8} sm={10} xs={12} lg={8}>
              <Paper className={classes.paper}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" variant="title">
                      Dashboard
                    </Typography>
                    <Typography variant="subtitle2">
                      Welcome {user.firstName}!
                    </Typography>
                    <Typography className={classes.textDetailsN}>
                      You have not yet setup a profile, please add some info
                    </Typography>
                    <Link
                      underline="none"
                      component={RouterLink}
                      to="/profileForm"
                    >
                      Create Profile
                    </Link>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        );
      } else {
        // Education Content
        if (!isEmpty(profile._education)) {
          educationContent = <EducationFeed educationList={profile._education}/>;
        }
        // Experience Content
        if (!isEmpty(profile._experience)) {
          experienceContent = <CardContent>some experience</CardContent>;
        }
        content = (
          <div>
            <Grid
              container
              justify="center"
              className={classes.dashboardContainer}
              spacing={16}
            >
              <Grid
                className={classes.avatarGrid}
                item
                lg={2}
                md={2}
                sm={12}
                xs={12}
              >
                <Avatar
                  className={classes.avatar}
                  alt="lba"
                  src={`https://api.adorable.io/avatars/200/${
                    profile.username
                  }.png`}
                />
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="headline">
                      {user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography variant="title">
                      {profile.professionalStatus}
                    </Typography>
                    <Typography variant="subtitle1">
                      {profile.location}
                    </Typography>

                    <Link
                      underline="none"
                      component={RouterLink}
                      to="/profileForm"
                    >
                      Update Profile
                    </Link>
                  </CardContent>
                </Card>
              </Grid>

              {/* education */}
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="title">Education</Typography>
                    {educationContent}
                    <EducationForm className={classes.educationForm} />
                  </CardContent>
                </Card>
              </Grid>

              {/* experience */}
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="title">Experience</Typography>
                    <Link underline="none" component={RouterLink} to="#">
                      <IoIosAdd />
                      Add experience
                    </Link>
                    {experienceContent}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
    return (
      <div className={classes.paper}>
        {/* <Typography>Welcome back, {user.firstName}</Typography> */}
        {content}
      </div>
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
