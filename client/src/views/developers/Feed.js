import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { getProfiles } from "actions/profileActions";
import styles from 'assets/jss/views/profilesFeedStyles';
import Loading from 'views/common/Loading'
import ProfileCard from './profileCard';

class DevelopersFeed extends Component {
  componentDidMount = () =>{
    this.props.getProfiles();
  }
  render () {
    const {classes} = this.props;
    const {profiles, loading} = this.props.profile;
    let content;
    if(profiles === null || loading ) {
      content = (
        <Loading/>
      )
    }else{
      content = profiles.map(profile => <ProfileCard key={profile._id} user={profile}/>)
    }
    return (
      <Grid container justify='center'>
        {content}
      </Grid>
    )
  }
}

DevelopersFeed.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(withStyles(styles)(DevelopersFeed))