import {
  Avatar,
  Button,
  Chip,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@material-ui/core";
import { School } from "@material-ui/icons";
import React, { Component } from "react";
import isEmpty from "../../../validation/is-empty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";
import { connect } from "react-redux";
import { addEducation,setEducationCompletion } from "actions/profileActions";
import PropTypes from "prop-types";

class EducationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      educationInput: {
        school: "",
        degree: "",
        fieldOfStudy: "",
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
      this.setState({errors: nextProps.errors});
    }
    if(nextProps.profile.educationCompleted){
      this.setState(state => ({
        ...state,
        educationInput: {
          ...state.educationInput,
          school: "",
          degree: "",
          fieldOfStudy: "",
          from: new Date(),
          to: new Date(),
          current: false,
          description: ""
        }
      }));
    }
  }
  onClickShowForm = () => {
    this.props.setEducationCompletion(false)
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.addEducation(this.state.educationInput)
  };
  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      educationInput: {
        ...prevState.educationInput,
        [e.target.name]: e.target.value
      }
    }));
  };
  onChangeCheck = name => event => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      educationInput: {
        ...prevState.educationInput,
        [name]: event.target.checked
      }
    }));
  };
  onChangeDate = name => date => {
    this.setState(prevState => ({
      ...prevState,
      educationInput: {
        ...prevState.educationInput,
        [name]: date
      }
    }));
  };
  render() {
    const { educationLoading, educationCompleted } = this.props.profile;
    let submitButtom;
    if (educationLoading) {
      submitButtom = <CircularProgress/>;
    }else{
      submitButtom = <Button type="submit">Add</Button>
    }
    let content;    
    if (!educationCompleted) {
      content = (
        <form onSubmit={this.onSubmit}>
          <TextField
            error={!isEmpty(this.state.errors.school)}
            helperText={this.state.errors.school}
            fullWidth
            label="School"
            name="school"
            onChange={this.onChange}
            value={this.state.educationInput.school}
          />
          <TextField
            error={!isEmpty(this.state.errors.degree)}
            helperText={this.state.errors.degree}
            fullWidth
            label="Degree"
            name="degree"
            onChange={this.onChange}
            value={this.state.educationInput.degree}
          />
          <TextField
            error={!isEmpty(this.state.errors.fieldOfStudy)}
            helperText={this.state.errors.fieldOfStudy}
            fullWidth
            label="Field of study"
            name="fieldOfStudy"
            onChange={this.onChange}
            value={this.state.educationInput.fieldOfStudy}
          />
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="From"
                value={this.state.educationInput.from}
                onChange={this.onChangeDate("from")}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="To"
                value={this.state.educationInput.to}
                onChange={this.onChangeDate("to")}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.educationInput.current}
                onChange={this.onChangeCheck("current")}
                value="current"
                name="current"
                color="primary"
              />
            }
            label="Primary"
          />
          <TextField
            error={!isEmpty(this.state.errors.description)}
            helperText={this.state.errors.description}
            fullWidth
            multiline
            label="Description"
            name="description"
            onChange={this.onChange}
            value={this.state.educationInput.description}
          />
          {submitButtom}
        </form>
      );
    } else {
      content = (
        <Chip
          color="primary"
          variant="outlined"
          avatar={
            <Avatar>
              <School />
            </Avatar>
          }
          label="Add Education"
          onClick={this.onClickShowForm}
          // className={classes.chip}
        />
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

EducationForm.propTypes = {
  addEducation: PropTypes.func.isRequired,
  setEducationCompletion: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation,setEducationCompletion }
)(EducationForm);
