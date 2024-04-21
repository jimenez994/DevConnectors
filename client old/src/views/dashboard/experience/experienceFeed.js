import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from './experienceItem';

class ExperienceFeed extends Component {
  render () {
    const {experienceList} = this.props;
    return experienceList.map(experience =><ExperienceItem key={experience._id} experience={experience}/>)
  }
}

ExperienceFeed.propTypes = {
  experienceList: PropTypes.array.isRequired
}

export default ExperienceFeed