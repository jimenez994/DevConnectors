import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, CardContent, Typography, Card, Link } from "@material-ui/core";
// import isEmpty from "./../../validation/is-empty";

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
        // if (this.refs.myRef) {
        this.setState({ repos: data });
        // }
      })
      .catch(err => console.log(err));
  };
  render() {

    let content;
    if (this.state.repos.constructor !== Array) {
      content = <Typography>No repos</Typography>;
    } else {
      content = this.state.repos.map(repo => (
        <Card style={{ marginBottom: "5px" }} key={repo.id}>
          <CardContent>
            <Grid container direction="row">
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Link href={repo.html_url} target="_blank" variant="subtitle2">{repo.name}</Link>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography variant="caption">
                <span style={{backgroundColor:"#28B3F3", padding:"2px 5px 2px 5px", borderRadius:"5px", color:"white" }}>{" Starts: "+repo.forks_count}</span>
                <span style={{backgroundColor:"#6C757D", margin:"0px 5px 0px 5px", padding:"2px 5px 2px 5px", borderRadius:"5px", color:"white" }}>{" Watchers: "+repo.forks_count}</span>
                <span style={{backgroundColor:"#2BA745", padding:"2px 5px 2px 5px", borderRadius:"5px", color:"white" }}>{" Forks: "+repo.forks_count}</span>
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1">{repo.description}</Typography>
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
