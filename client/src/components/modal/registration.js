import React, { Component } from 'react'
import { Card, CardContent, FormControl, InputLabel, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../assets/modal'

class Registration extends Component {
  render () {
    const {classes} = this.props;
    return (
      <div className={classes.modalOverlay}>
      <Card  >
        <CardContent>
          <form>
            <FormControl>
              <InputLabel>First Name</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>Last Name</InputLabel>
              <Input/>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>Confirm password</InputLabel>
              <Input/>
            </FormControl>
          </form>
          <button  onClick={this.props.close}>CLOSE</button>
        </CardContent>
      </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Registration)