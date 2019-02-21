import {
  Avatar,
  Button,
  Chip,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { School } from "@material-ui/icons";
import React, { Component } from "react";
import isEmpty from "../../../validation/is-empty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";

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
  onClickShowForm = () => {
    this.setState({ showForm: true });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ showForm: false });
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
        [name] : event.target.checked
      }
    }));
  }
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
    let content;
    if (this.state.showForm) {
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
                onChange={this.onChangeDate('from')}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="To"
                value={this.state.educationInput.to}
                onChange={this.onChangeDate('to')}
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
            label="Description"
            name="description"
            onChange={this.onChange}
            value={this.state.educationInput.description}
          />
          <Button type="submit">Add</Button>
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

EducationForm.propTypes = {};

export default EducationForm;
