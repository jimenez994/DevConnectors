import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/views/profileCardStyle";
import {Check} from '@material-ui/icons';
import { FaYoutube } from 'react-icons/fa';



class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    const { classes } = this.props;
    let skills = user.skills;
    if(skills.length > 3){
      skills = user.skills.slice(1,4)
    }
    let skillContent = skills.map(skill => (
      <Fab variant="extended" size="small" disableRipple disableTouchRipple disableFocusRipple color="primary" className={classes.skillFab}>
        <Check/>
        {skill}
      </Fab>
    ));
    return (
      <a className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.img}
            image={`https://api.adorable.io/avatars/200/${user.username}.png`}
            title="Live from space album cover"
            />
          <CardContent className={classes.cardContent}>
            <Typography variant="title">
              {user._user.firstName} {user._user.lastName}
            </Typography>
            {/* <FaYoutube size="2em" color="red"/> */}
            <Typography variant="subtitle1">{user.professionalStatus}</Typography>
            {skillContent}
          </CardContent>
        </Card>
      </a>
    );
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCard);
