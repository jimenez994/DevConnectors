import React, { Component } from 'react';
import { Card, CardContent, Button, TextField, Grid, CardHeader, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/views/loginStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from 'actions/authActions';
import isEmpty from 'validation/is-empty';
import Container from 'components/Grid/Container'
import {Animated} from "react-animated-css";

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
      <div className={classes.backImg}>
        <Container justify="center" className={classes.darkOverlay}>
          <Grid className={classes.center} item xs={12} sm={6} md={4}>
          <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
              <CardHeader className={classes.header} classes={{title: classes.title,}} title="Log in"/>
            <Card className={classes.card}>
              <CardContent >
                <form onSubmit={this.onSubmit} >
                    <TextField error={!isEmpty(this.state.errors.email)} helperText={this.state.errors.email} fullWidth label="Email" onChange={this.onChange} value={this.state.userLoginInfo.email} name="email"/>
                    <TextField error={!isEmpty(this.state.errors.password)} helperText={this.state.errors.password} fullWidth label="Password" onChange={this.onChange} type="password" value={this.state.userLoginInfo.password} name="password"/>
                  <Button className={classes.logInBtn} fullWidth color="primary" type="submit">Login</Button>
                </form>
              </CardContent>
            </Card>
            </Animated>
          </Grid>
        </Container>
      </div>
    )
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login))