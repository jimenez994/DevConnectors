import React, { Component } from 'react';import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  backStyle: {
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
  grow:{
    flexGrow:1
  },
  darkerText:{
    color: 'white',
    fontWeight: '900'
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.backStyle}>
          <Toolbar>
          <Link color="inherit" underline="none" component={RouterLink} to="/">DevConnectors</Link>
              <Button color="inherit">Developers</Button>
              <div className={classes.grow}/>
              <Link color="inherit" underline="none" component={RouterLink} to="/register">Register  </Link> 
              <Link color="inherit" underline="none" component={RouterLink} to="/login"> Login</Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);