import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';

class ProfileCard extends Component {
  render () { 
    const {user} = this.props
    return (
      <Card>
        {user.skills}
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default ProfileCard