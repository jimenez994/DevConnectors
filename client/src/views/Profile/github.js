import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "4a788ddeb3cc7bd6397e",
      clientSecret: "c2477c194840f61c55ab2e6e9ff55c688fdf4a6c",
      count: 8,
      sort: "created: asc",
      repos: []
    }
  }
  componentDidMount = () => {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  
  }
  render () {
    console.log(this.state.repos);
    
    return (
      <div>
        
      </div>
    )
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
}

export default ProfileGithub