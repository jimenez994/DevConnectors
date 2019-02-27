import DateFnsUtils from "@date-io/date-fns";
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, TextField } from "@material-ui/core";
import { School } from "@material-ui/icons";
import { addEducation, setEducationCompletion } from "actions/profileActions";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";

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
          <FormControl fullWidth >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                keyboard
                format="MM/dd/yyyy"
                // placeholder="11/09/1994"
                mask={value =>
                  value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
                }
                helperText={this.state.errors.from}
                error={!isEmpty(this.state.errors.from)}
                label="Start"
                value={this.state.educationInput.from}
                onChange={this.onChangeDate("from")}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disabled={this.state.educationInput.current}
                keyboard
                format="MM/dd/yyyy"
                // placeholder="11/09/1994"
                mask={value =>
                  value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
                }
                helperText={this.state.errors.to}
                error={!isEmpty(this.state.errors.to)}
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
            value={this.state.educationInput.description}
          />
          {submitButtom}
        </form>
      );
    } else {
      content = (
        <Button onClick={this.onClickShowForm} color="primary">
          <School style={{marginRight:"4px"}}/>
          Add Education
        </Button>
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
