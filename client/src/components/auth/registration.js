import React, { Component } from 'react'
import { Card, CardContent, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../assets/modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User:{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        comfirmPassword: ""
      },
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
  }
  onChange = (e) => {
    e.persist();
    // this.setState({User : {[e.target.name]: e.target.value}})
    this.setState(prevState => ({
      ...prevState,
      User:{
        ...prevState.User, [e.target.name]: e.target.value
      }
    }))
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state.User)
  }
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.modalOverlay}>
      <Card  >
        <CardContent>
          <form onSubmit={this.onSubmit} >
            <FormControl>
              <InputLabel>First Name</InputLabel>
              <Input onChange={this.onChange} value={this.state.User.firstName} name="firstName"/>
            </FormControl>
            <FormControl>
              <InputLabel>Last Name</InputLabel>
              <Input onChange={this.onChange} value={this.state.User.lastName} name="lastName"/>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input onChange={this.onChange} value={this.state.User.email} name="email"/>
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input onChange={this.onChange} type="password" value={this.state.User.password} name="password"/>
            </FormControl>
            <FormControl>
              <InputLabel>Confirm password</InputLabel>
              <Input onChange={this.onChange} type="password" value={this.state.User.comfirmPassword} name="comfirmPassword"/>
            </FormControl>
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
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(Registration))