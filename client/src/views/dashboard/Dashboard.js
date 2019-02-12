import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink } from 'react-router-dom'
import {getCurrentProfile, createOrUpdateProfile} from 'actions/profileActions'
import { Grid, Typography, Button, Link } from '@material-ui/core';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }
  }
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }
  onClick = () => {
    this.props.createOrUpdateProfile({username:'', profecionalStatus:'', skills:''}, this.props.history)
  }
  render () {
    const {user} = this.props.auth
    const {profile} = this.props.profile
    let content;
    if(profile === null){
      content = (
        <Link underline="none" component={RouterLink} to="/profileForm" >Create Profile</Link>
      )
    }
    return (
      <Grid container>
        <Typography>
          Welcome back, {user.firstName}
        </Typography>
        {content}
      </Grid>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, createOrUpdateProfile})(Dashboard);