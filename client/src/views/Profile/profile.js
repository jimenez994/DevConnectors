import { Grid } from "@material-ui/core";
import { getProfileByUsername } from 'actions/profileActions';
import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import isEmpty from "../../validation/is-empty";
import Loading from 'views/common/Loading';

class SimpleMenu extends React.Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  };
  render() {
    const {profile, loading} = this.props.profile;
    let content;
    if(isEmpty(profile) || loading){
      content= <Loading/>
    }else{
      content= <Header profile={profile} />

    }
    return (
      <Grid container justify="center" style={{margin:"15px"}} spacing={16}>
        {content}
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  profile:  state.profile,
})

export default connect(mapStateToProps, {getProfileByUsername})(SimpleMenu);
