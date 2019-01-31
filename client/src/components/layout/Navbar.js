import React, { Component } from 'react';import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  render () {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.backStyle}>
          <Toolbar>
              <Button className={classes.darkerText} ><span>Dev</span>Connectors</Button>
              <Button color="inherit">Developers</Button>
              <div className={classes.grow}/>
              <Button color="inherit">Sign Up</Button>
              <Button color="inherit">Login</Button>
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