import React, { Component } from 'react';
import { Card,Input, CardContent, FormControl, InputLabel, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../assets/modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      userLoginInfo: {
        email: '',
        password: ''
      },
      errors: {}
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
      this.setState({ errors: nextProps.errors });
    }
    console.log(this.state.errors);
    
  }
  onChange = (e) => {
    e.persist();
    // this.setState({User : {[e.target.name]: e.target.value}})
    this.setState(prevState => ({
      ...prevState,
      userLoginInfo:{
        ...prevState.userLoginInfo, [e.target.name]: e.target.value
      }
    }))
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.userLoginInfo)
  }

  render () {
    const {classes} = this.props
    return (
      <div className={classes.modalOverlay}>
      <Card  >
        <CardContent>
          <form onSubmit={this.onSubmit} >
            <FormControl fullWidth error={true}>
              <InputLabel>Email</InputLabel>
              <Input onChange={this.onChange} value={this.state.userLoginInfo.email} name="email"/>
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input onChange={this.onChange} type="password" value={this.state.userLoginInfo.password} name="password"/>
            </FormControl>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
      </div>
    )
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login))