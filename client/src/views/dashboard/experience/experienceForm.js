import DateFnsUtils from "@date-io/date-fns";
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, TextField } from "@material-ui/core";
import { Work } from "@material-ui/icons";
import { addExperience, setExperienceCompletion } from "actions/profileActions";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";

class ExperienceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      experienceInput: {
        title: "",
        company: "",
        location: "",
        from: new Date(),
        to: new Date(),
        current: false,
        description: ""
      },
      errors: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.experienceCompleted) {
      this.setState(state => ({
        ...state,
        experienceInput: {
          ...state.experienceInput,
          title: "",
          company: "",
          location: "",
          from: new Date(),
          to: new Date(),
          current: false,
          description: ""
        }
      }));
    }
  }
  onClickShowForm = () => {
    this.props.setExperienceCompletion(false);
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.addExperience(this.state.experienceInput);
  };
  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      experienceInput: {
        ...prevState.experienceInput,
        [e.target.name]: e.target.value
      }
    }));
  };
  onChangeCheck = name => event => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      experienceInput: {
        ...prevState.experienceInput,
        [name]: event.target.checked
      }
    }));
  };
  onChangeDate = name => date => {
    this.setState(prevState => ({
      ...prevState,
      experienceInput: {
        ...prevState.experienceInput,
        [name]: date
      }
    }));
  };
  render() {
    const { experienceLoading, experienceCompleted } = this.props.profile;
    let submitButtom;
    if (experienceLoading) {
      submitButtom = <CircularProgress />;
    } else {
      submitButtom = <Button type="submit">Add</Button>;
    }
    let content;
    if (!experienceCompleted) {
      content = (
        <form onSubmit={this.onSubmit}>
          <TextField
            error={!isEmpty(this.state.errors.title)}
            helperText={this.state.errors.title}
            fullWidth
            label="Title"
            name="title"
            onChange={this.onChange}
            value={this.state.experienceInput.title}
          />
          <TextField
            error={!isEmpty(this.state.errors.company)}
            helperText={this.state.errors.company}
            fullWidth
            label="Company"
            name="company"
            onChange={this.onChange}
            value={this.state.experienceInput.company}
          />
          <TextField
            error={!isEmpty(this.state.errors.location)}
            helperText={this.state.errors.location}
            fullWidth
            label="Location"
            name="location"
            onChange={this.onChange}
            value={this.state.experienceInput.location}
          />
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                keyboard
                format="MM/dd/yyyy"
                // placeholder="11/09/1994"
                mask={value =>
                  value
                    ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                    : []
                }
                helperText={this.state.errors.from}
                error={!isEmpty(this.state.errors.from)}
                label="Start"
                value={this.state.experienceInput.from}
                onChange={this.onChangeDate("from")}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disabled={this.state.experienceInput.current}
                keyboard
                format="MM/dd/yyyy"
                // placeholder="11/09/1994"
                mask={value =>
                  value
                    ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                    : []
                }
                helperText={this.state.errors.to}
                error={!isEmpty(this.state.errors.to)}
                label="To"
                value={this.state.experienceInput.to}
                onChange={this.onChangeDate("to")}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.experienceInput.current}
                onChange={this.onChangeCheck("current")}
                value="current"
                name="current"
                color="primary"
              />
            }
            label="Current"
          />
          <TextField
            error={!isEmpty(this.state.errors.description)}
            helperText={this.state.errors.description}
            fullWidth
            multiline
            label="Description"
            name="description"
            onChange={this.onChange}
            value={this.state.experienceInput.description}
          />
          {submitButtom}
        </form>
      );
    } else {
      content = (
        <Button color="primary" onClick={this.onClickShowForm}>
          <Work style={{ marginRight: "4px" }} />
          Add Experience
        </Button>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

ExperienceForm.propTypes = {
  addExperience: PropTypes.func.isRequired,
  setExperienceCompletion: PropTypes.func.isRequired
  // profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience, setExperienceCompletion }
)(ExperienceForm);
