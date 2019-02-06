import React, { Component } from 'react'
import { Card, CardContent,TextField, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../assets/modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import isEmpty from '../../validation/is-empty';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRegisterInfo:{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errors:{}
    }
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');      
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onChange = (e) => {
    e.persist();
    // this.setState({User : {[e.target.name]: e.target.value}})
    this.setState(prevState => ({
      ...prevState,
      userRegisterInfo:{
        ...prevState.userRegisterInfo, [e.target.name]: e.target.value
      }
    }))
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state.userRegisterInfo)
  }
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.modalOverlay}>
      <Card  >
        <CardContent>
          <form onSubmit={this.onSubmit} >
            <TextField error={!isEmpty(this.state.errors.firstName)} helperText={this.state.errors.firstName} label="First name" onChange={this.onChange} value={this.state.userRegisterInfo.firstName} name="firstName"/>
            <TextField error={!isEmpty(this.state.errors.lastName)} helperText={this.state.errors.lastName}  label="Last name" onChange={this.onChange} value={this.state.userRegisterInfo.lastName} name="lastName"/>
            <TextField error={!isEmpty(this.state.errors.email)} helperText={this.state.errors.email} fullWidth label="Email" onChange={this.onChange} value={this.state.userRegisterInfo.email} name="email"/>
            <TextField type="password" error={!isEmpty(this.state.errors.password)} helperText={this.state.errors.password}  label="Password" onChange={this.onChange} value={this.state.userRegisterInfo.password} name="password"/>
            <TextField type="password" error={!isEmpty(this.state.errors.confirmPassword)} helperText={this.state.errors.confirmPassword}  label="Confirm password" onChange={this.onChange} value={this.state.userRegisterInfo.confirmPassword} name="confirmPassword"/>
            <Button type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
      </div>
    )
  }
}
Registration.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(Registration))