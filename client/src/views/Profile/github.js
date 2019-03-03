import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, CardContent, Typography, Card } from "@material-ui/core";
import isEmpty from "./../../validation/is-empty";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "9d4aad08386a6ed1753b",
      clientSecret: "f0b874e56e74eeaa88b4e9013c94702d1d86ac7d",
      count: 8,
      sort: "created: asc",
      repos: []
    };
  }
  componentDidMount = () => {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(this.refs.myRef);
        // if (this.refs.myRef) {
        this.setState({ repos: data });
        // }
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state.repos);
    let content;
    if (isEmpty(this.state.repos)) {
      content = <Typography>No repos</Typography>;
    } else {
      content = this.state.repos.map(repo => (
        <Card style={{ marginBottom: "5px" }} key={repo.id}>
          <CardContent>
            <Grid container direction="row">
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Typography variant="subtitle2">{repo.name}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography>
                  <span>Stars: {repo.forks_count}</span>
                  <span> Watchers: {repo.forks_count}</span>
                  <span> Forks: {repo.forks_count}</span>
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2">{repo.description}</Typography>
          </CardContent>
        </Card>
      ));
    }
    return (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="subtitle2">Latest Github Repos</Typography>
          </CardContent>
        </Card>
        {content}
      </Grid>
    );
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
