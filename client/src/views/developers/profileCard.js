import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/views/profileCardStyle'

class ProfileCard extends Component {
  render () { 
    const {user} = this.props
    const {classes} = this.props
    return (
      <Card>
        <CardMedia
          className={classes.img}
          image={`https://api.adorable.io/avatars/200/${user._user.username}.png`}
          title="Live from space album cover"
        />
        {user.skills}
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileCard)