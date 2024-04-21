import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EducationItem from './educationItem';

class EducationFeed extends Component {
  render () {
    const {educationList} = this.props;
    return educationList.map(education =><EducationItem key={education._id} education={education}/>)
  }
}

EducationFeed.propTypes = {
  educationList: PropTypes.array.isRequired
}

export default EducationFeed