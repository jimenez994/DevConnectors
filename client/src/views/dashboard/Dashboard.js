import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCurrentProfile} from 'actions/profileActions'
import { Grid, Typography } from '@material-ui/core';


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
  render () {
    const {user} = this.props.auth
    let content;
    // if(this.props.)
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
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);