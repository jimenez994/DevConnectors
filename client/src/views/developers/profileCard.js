import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/views/profileCardStyle";
import { Done } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import { FaYoutube } from 'react-icons/fa';

class ProfileCard extends Component {
  render() {
    const { user } = this.props;
    const { classes } = this.props;
    let skills = user.skills;
    if (skills.length > 3) {
      skills = user.skills.slice(1, 4);
    }
    let skillContent = skills.map((skill,i) => (
      <Chip
        key={i}
        color="primary"
        label={skill}
        icon={<Done/>}
        clickable
        className={classes.skillFab}
      />
    ));
    return (
      <Link
        to={"/profile/" + user.username}
        href={user._id}
        className={classes.cardContainer}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.img}
            image={user._user.avatar}
            title="Live from space album cover"
          />
          <CardContent className={classes.cardContent}>
          {/* {user._user.email} */}
            <Typography variant="title">
              {user._user.firstName} {user._user.lastName}
            </Typography>
            {/* <FaYoutube size="2em" color="red"/> */}
            <Typography variant="subtitle1">
              {user.professionalStatus}
            </Typography>
            {skillContent}
          </CardContent>
        </Card>
      </Link>
    );
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCard);
