import {
  Grid,
  Avatar,
  CardContent,
  Typography,
  Card,
  CardMedia
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/views/profileStyle";
import React, { Component } from "react";

class Header extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;

    return (
      <React.Fragment>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card>
            <CardMedia
              className={classes.cardMediaHeader}
              image={require("./../../assets/img/nightSky.jpg")}
              title={profile._user.firstName + " " + profile._user.lastName}
            />
            <CardContent>
              <Grid
                className={classes.avatarContainerHeader}
                container
                justify="center"
              >
                <Avatar
                  className={classes.avatarHeader}
                  alt="Remy Sharp"
                  src={`https://api.adorable.io/avatars/200/${
                    profile.username
                  }.png`}
                />{" "}
              </Grid>
              <Typography variant="headline">
                {profile._user.firstName + " " + profile._user.lastName}
              </Typography>
              <Typography variant="title">
                {profile.professionalStatus}
              </Typography>
              <Typography variant="subtitle1">{profile.location}</Typography>
              <Typography variant="body1">
                {profile.bio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Header);
