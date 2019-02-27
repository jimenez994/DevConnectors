import { Grid, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/views/dashboardStyle";
import React, { Component } from "react";

class Header extends Component {
  render() {
    const {classes} = this.props;
    const {profile} = this.props;
    console.log(profile);
    
    return (
      <Grid container justify="center">
        <Grid className={classes.avatarGrid} item lg={2} md={2} sm={12} xs={12}>
          <Avatar
            className={classes.avatar}
            alt="lba"
            src={`https://api.adorable.io/avatars/200/${profile.username}.png`}
          />
        </Grid>
      </Grid>
    );
  }
}


export default (withStyles(styles)(Header));
