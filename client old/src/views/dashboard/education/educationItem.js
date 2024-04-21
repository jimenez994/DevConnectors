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
import { deleteEducation } from "actions/profileActions";
import { connect } from "react-redux";
import { School, MoreVert } from "@material-ui/icons";

class Education extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  deleteItem = id =>() => {
    this.props.deleteEducation(id)
    this.setState({ anchorEl: null });
  };
  handleClose =() => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { education } = this.props;
    let content = (
      <Card key={education._id} style={{ marginBottom: "10px" }}>
        <CardHeader
          style={{paddingBottom: "0px"}}
          avatar={
            <Avatar>
              <School />
            </Avatar>
          }
          action={
            <React.Fragment>
              <IconButton
                aria-owns={anchorEl ? `${education._id}` : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id={education._id}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.deleteItem(education._id)}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          }
          title={education.school}
          subheader={
            <Typography color="textSecondary">
              <Moment format="MMM YYYY">{education.from}</Moment> -{" "}
              <Moment format="MMM YYYY">{education.to}</Moment>
            </Typography>
          }
        />
        <CardContent>
          {education.degree + ", " + education.fieldOfStudy}
          <Typography variant="body1"  style={{whiteSpace: 'pre-line', marginTop:"5px"}}>{`${education.description}`}</Typography>
        </CardContent>
      </Card>
    );
    return <div>{content}</div>;
  }
}

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
