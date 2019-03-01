import { Grid, Avatar, CardContent, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/views/dashboardStyle";
import React, { Component } from "react";

class Header extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;

    return (
      <React.Fragment>
        <Grid className={classes.avatarGrid} item lg={2} md={2} sm={12} xs={12}>
          <Avatar
            className={classes.avatar}
            alt="lba"
            src={`https://api.adorable.io/avatars/200/${profile.username}.png`}
          />
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="headline">
                {profile._user.firstName + " " + profile._user.lastName}
              </Typography>
              <Typography variant="title">
                {profile.professionalStatus}
              </Typography>
              <Typography variant="subtitle1">{profile.location}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Header);
