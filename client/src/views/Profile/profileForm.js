import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "validation/is-empty";
import {
  Paper,
  TextField,
  Grid,
  Tooltip,
  FormControl,
  Select,
  Input,
  MenuItem,
  FormHelperText,
  InputLabel,
  Fab,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import {
  createOrUpdateProfile,
  getCurrentProfile
} from "actions/profileActions";
import styles from "assets/jss/views/profileFormStyles";
import { withStyles } from "@material-ui/core/styles";
import Loading from "views/common/Loading";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        githubUsername: "",
        bio: "",
        social: {
          youtube: "",
          twitter: "",
          facebook: "",
          linkedin: "",
          instagram: " "
        }
      },
      errors: {}
    };
  }

  componentWillMount() {}

  componentDidMount = () => {
    // check if profile is  state, if not called the api
    // this is good if the page is refreshed
    const { profile } = this.props.profile;
    if (!isEmpty(profile)) {
      this.setState({ profileInputs: profile });
    } else {
      this.props.getCurrentProfile();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.profile.profile)) {
      this.setState({ profileInputs: nextProps.profile.profile });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
  onSubmit = e => {
    e.preventDefault();
    this.props.createOrUpdateProfile(
      this.state.profileInputs,
      this.props.history
    );
  };
  onChangeMain = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      profileInputs: {
        ...prevState.profileInputs,
        [e.target.name]: e.target.value
      }
    }));
  };
  onChangeSocial = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      profileInputs: {
        ...prevState.profileInputs,
        social: {
          ...prevState.profileInputs.social,
          [e.target.name]: e.target.value
        }
      }
    }));
  };

  render() {
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;
    let content;
    if (profile === null || loading === true) {
      content = (<Loading />);
    } else {
      content = (
        <Grid container justify="center">
        <Grid item md={8} sm={10} xs={12} lg={6}>
          <Paper className={classes.paper}>
            <form onSubmit={this.onSubmit} className={classes.form}>
              <Tooltip
                title="A unique username for your profile URL"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.username)}
                  helperText={this.state.errors.username}
                  label="Username *"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.username}
                  name="username"
                  margin="normal"
                />
              </Tooltip>
              <FormControl
                fullWidth
                error={!isEmpty(this.state.errors.professionalStatus)}
              >
                <InputLabel htmlFor="age-helper">
                  Professional Status *
                </InputLabel>
                <Select
                  value={this.state.profileInputs.professionalStatus}
                  onChange={this.onChangeMain}
                  input={<Input name="professionalStatus" id="age-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Junior Developer">Junior Developer</MenuItem>
                  <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Student or Learning">
                    Student or Learning
                  </MenuItem>
                  <MenuItem value="Instructort or Teacher">
                    Instructor or Teacher
                  </MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>
                  {this.state.errors.professionalStatus}
                </FormHelperText>
              </FormControl>
              <Tooltip
                title="Could be your own company or one you work for"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.company)}
                  helperText={this.state.errors.company}
                  label="Company"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.company}
                  name="company"
                  margin="normal"
                />
              </Tooltip>
              <Tooltip
                title="Could be your own website or a company one"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.website)}
                  helperText={this.state.errors.website}
                  label="Website"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.website}
                  name="website"
                  margin="normal"
                />
              </Tooltip>
              <Tooltip
                title="City or city & state suggested (eg. Boston, MA)"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.location)}
                  helperText={this.state.errors.location}
                  label="Location"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.location}
                  name="location"
                  margin="normal"
                />
              </Tooltip>
              <Tooltip
                title="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.skills)}
                  helperText={this.state.errors.skills}
                  label="Skills *"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.skills}
                  name="skills"
                  margin="normal"
                />
              </Tooltip>
              <Tooltip
                title="If you want your latest repos and a Github link, include your username"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.githubUsername)}
                  helperText={this.state.errors.githubUsername}
                  label="Github username"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.githubUsername}
                  name="githubUsername"
                  margin="normal"
                />
              </Tooltip>
              <Tooltip
                title="Tell us a little about yourself"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  error={!isEmpty(this.state.errors.bio)}
                  helperText={this.state.errors.bio}
                  label="Short bio"
                  onChange={this.onChangeMain}
                  value={this.state.profileInputs.bio}
                  name="bio"
                  margin="normal"
                  multiline
                />
              </Tooltip>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Social Media</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.youtube)}
                      helperText={this.state.errors.youtube}
                      label="Youtube"
                      onChange={this.onChangeSocial}
                      value={this.state.profileInputs.social.youtube}
                      name="youtube"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.twitter)}
                      helperText={this.state.errors.twitter}
                      label="Twitter"
                      onChange={this.onChangeSocial}
                      value={this.state.profileInputs.social.twitter}
                      name="twitter"
                      margin="normal"
                    />

                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.facebook)}
                      helperText={this.state.errors.facebook}
                      label="Facebook"
                      onChange={this.onChangeSocial}
                      value={this.state.profileInputs.social.facebook}
                      name="facebook"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.linkedin)}
                      helperText={this.state.errors.linkedin}
                      label="Linkedin"
                      onChange={this.onChangeSocial}
                      value={this.state.profileInputs.social.linkedin}
                      name="linkedin"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.instagram)}
                      helperText={this.state.errors.instagram}
                      label="Instagram"
                      onChange={this.onChangeSocial}
                      value={this.state.profileInputs.social.instagram}
                      name="instagram"
                      margin="normal"
                    />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <FormControl margin="normal">
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  color="primary"
                  type="submit"
                >
                  {/* <NavigationIcon /> */}
                  Submit
                </Fab>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
      )
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  createOrUpdateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateProps,
  { createOrUpdateProfile, getCurrentProfile }
)(withStyles(styles)(ProfileForm));
