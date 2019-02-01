import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
const styles = {
  paper: {
    textAlign:'center'
  }
}

class Footer extends Component {
  render () {
    const {classes} = this.props
    return (
      <Grid>
        <Paper className={classes.paper}>
          Copyright &copy; {new Date().getFullYear()} DevConnector
        </Paper>

      </Grid>
          
          
        
    )
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Footer)