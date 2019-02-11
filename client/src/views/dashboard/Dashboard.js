import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCurrentProfile, createOrUpdateProfile} from 'actions/profileActions'
import { Grid, Typography, Button } from '@material-ui/core';


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
    let content;
    // if(this.props.)
    return (
      <Grid container>
        <Typography>
          Welcome back, {user.firstName}
        </Typography>
        <Button onClick={this.onClick}>Create profile</Button>
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
  auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, createOrUpdateProfile})(Dashboard);