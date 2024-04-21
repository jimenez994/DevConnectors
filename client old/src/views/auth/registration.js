import React, { Component } from "react";
import { TextField, Button, Grid, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "actions/authActions";
import isEmpty from "validation/is-empty";
import Container from "components/Grid/Container";
import styles from "assets/jss/views/registrationStyle";
import { Animated } from "react-animated-css";
import {AccountCircle, Lock, Email} from '@material-ui/icons';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRegisterInfo: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    e.persist();
    // this.setState({User : {[e.target.name]: e.target.value}})
    this.setState(prevState => ({
      ...prevState,
      userRegisterInfo: {
        ...prevState.userRegisterInfo,
        [e.target.name]: e.target.value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.registerUser(this.state.userRegisterInfo);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.backImg}>
        <Container justify="center" alignItems="center" className={classes.darkOverlay}>
          <Animated animationIn="fadeInDown" isVisible={true}>
            <Grid  container className={classes.registrationBox} >
                <Grid item container xs={12} sm={6} lg={6} md={6} className={classes.registrationInfo}>
                  <p>lorem vkemvjkvnrkjvj nvjnvrjvbrjv bvj erbvj njvnekjb nekb jbnkje rnkj nkj bvkjv
                    kjrvbne rjkbne bjk bnejk nek jnberjnbjkerbnerbjenb;kebeb
                      enrlrbnljrbnerlbkjnerjenr'erbvj nelrbneblnebljnerktjnejkvenbvkwjberk;jb
                  </p>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} md={6} className={classes.registrationForm} >
                  <form onSubmit={this.onSubmit}>
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.firstName)}
                      helperText={this.state.errors.firstName}
                      label="First name"
                      onChange={this.onChange}
                      value={this.state.userRegisterInfo.firstName}
                      name="firstName"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <AccountCircle color="disabled"/>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      error={!isEmpty(this.state.errors.lastName)}
                      helperText={this.state.errors.lastName}
                      label="Last name"
                      onChange={this.onChange}
                      value={this.state.userRegisterInfo.lastName}
                      name="lastName"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <AccountCircle color="disabled"/>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      error={!isEmpty(this.state.errors.email)}
                      helperText={this.state.errors.email}
                      fullWidth
                      label="Email"
                      onChange={this.onChange}
                      value={this.state.userRegisterInfo.email}
                      name="email"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <Email color="disabled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      error={!isEmpty(this.state.errors.password)}
                      helperText={this.state.errors.password}
                      label="Password"
                      onChange={this.onChange}
                      value={this.state.userRegisterInfo.password}
                      name="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <Lock color="disabled"/>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      error={!isEmpty(this.state.errors.confirmPassword)}
                      helperText={this.state.errors.confirmPassword}
                      label="Confirm password"
                      onChange={this.onChange}
                      value={this.state.userRegisterInfo.confirmPassword}
                      name="confirmPassword"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <Lock color="disabled" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button type="submit" fullWidth color="primary">Register</Button>
                  </form>
                </Grid>
            </Grid>
          </Animated>
        </Container>
      </div>
    );
  }
}
Registration.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(Registration));
