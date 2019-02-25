import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Moment from "react-moment";
import { deleteExperience} from "actions/profileActions";
import { connect } from "react-redux";
import {  MoreVert, Work } from "@material-ui/icons";

class Experience extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  deleteItem = id =>() => {
    this.props.deleteExperience(id)
    this.setState({ anchorEl: null });
  };
  handleClose =() => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { experience } = this.props;
    let content = (
      <Card key={experience._id} style={{ marginBottom: "10px" }}>
        <CardHeader
          style={{paddingBottom: "0px"}}
          avatar={
            <Avatar>
              <Work />
            </Avatar>
          }
          action={
            <React.Fragment>
              <IconButton
                aria-owns={anchorEl ? `${experience._id}` : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id={experience._id}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.deleteItem(experience._id)}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          }
          title={experience.title}
          subheader={
            <Typography color="textSecondary">
              <Moment format="MMM YYYY">{experience.from}</Moment> -{" "}
              <Moment format="MMM YYYY">{experience.to}</Moment>
            </Typography>
          }
        />
        <CardContent>
          {experience.company}
          <Typography variant="body1"  style={{whiteSpace: 'pre-line', marginTop:"5px"}}>{`${experience.description}`}</Typography>
        </CardContent>
      </Card>
    );
    return <div>{content}</div>;
  }
}

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteexperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience}
)(Experience);
