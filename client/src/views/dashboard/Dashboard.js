import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink } from 'react-router-dom'
import {getCurrentProfile, createOrUpdateProfile} from 'actions/profileActions'
import { Grid, Typography, Link } from '@material-ui/core';
import Loading from 'views/common/Loading'

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }
  onClick = () => {
    this.props.createOrUpdateProfile({username:'', profecionalStatus:'', skills:''}, this.props.history)
  }
  render () {
    const {user} = this.props.auth
    const {profile, loading} = this.props.profile
    let content;
    if(profile === null || loading === true ){
      content= (<Loading/>)
    }else{
        content = (
          <Link underline="none" component={RouterLink} to="/profileForm" >Create Profile</Link>
        )
      // content = (
      //   <div>some profile info ...</div>
      // )
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