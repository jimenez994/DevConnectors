import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "validation/is-empty";
import Container from "components/Grid/Container";
import { Paper, TextField, Button } from "@material-ui/core";
import {createOrUpdateProfile} from 'actions/profileActions'


class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInputs: {
        username: "",
        professionalStatus: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        bio: "",
        social: {
          youtube: "vv",
          twitter: "gre",
          facebook: "gr",
          linkedin: "gre",
          instagram: "grg"
        }
      }
    };
  }

  componentWillMount() {}

  componentDidMount = () => {
    const { profile } = this.props.profile;
    if (!isEmpty(profile)) {
      this.state.profile = profile;
    }
  };

  componentWillReceiveProps(nextProps) {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
  onSubmit = (e) => {
    e.preventDefault();
    this.props.createOrUpdateProfile(this.state.profileInputs, this.props.history)
  };
  onChangeMain = (e) => {    
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      profileInputs: {
        ...prevState.profileInputs,
        [e.target.name]: e.target.value
      }
    }))
  }
  onChangeSocial = (e) => {    
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      profileInputs: {
        ...prevState.profileInputs,
        social: {
          ...prevState.profileInputs.social,
          [e.target.name]: e.target.value
        }
      }
    }))
  }

  render() {
    return (
      <Container>
        <Paper>
          <form onSubmit={this.onSubmit}>
            <TextField
              label="Username"
              onChange={this.onChangeMain}
              value={this.state.profileInputs.username}
              name="username"
            />
            <TextField
              label="Facebook"
              onChange={this.onChangeSocial}
              value={this.state.profileInputs.social.facebook}
              name="facebook"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired
};

const mapStateProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateProps,
  {createOrUpdateProfile}
)(ProfileForm);
