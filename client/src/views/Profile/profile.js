import { Grid } from "@material-ui/core";
import { getProfileByUsername } from "actions/profileActions";
import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import Skills from "./skills";
import Education from "./education";
import Experiecne from "./experience";
import ProfileGihub from './github';
import isEmpty from "../../validation/is-empty";
import Loading from "views/common/Loading";

class SimpleMenu extends React.Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let content;
    if (isEmpty(profile) || loading) {
      content = <Loading />;
    } else {      
      content = (
        <React.Fragment>
          <Header profile={profile} />
          <Skills skills={profile.skills}/>
          <Experiecne experienceArray={profile._experience}/>
          <Education educationArray={profile._education} />
          <ProfileGihub username={profile.username}/>
        </React.Fragment>
      );
    }
    return (
      <Grid
      // direction="column"
        container
        justify="center"
        style={{ marginTop: "15px", marginBottom: "15px" }}
        spacing={16}
      >
        {content}
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUsername }
)(SimpleMenu);
