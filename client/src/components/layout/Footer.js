import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
const styles = {
  backStyle: {
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    alignItems: 'center'
  }
}

class Footer extends Component {
  render () {
    const {classes} = this.props
    return (
      <div >
        <AppBar position="static" className={classes.backStyle}>
          <Toolbar>
            <Typography color="inherit">
              Copyright &copy; {new Date().getFullYear()} DevConnectors
            </Typography>
          </Toolbar>
        </AppBar>
      </div>          
          
        
    )
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Footer)