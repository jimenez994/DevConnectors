import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { educationList } = this.props;
    let content = educationList.map(item => (
      <Card key={item._id} style={{ marginBottom: "10px" }}>
        <CardHeader
          style={{ paddingBottom: "0px" }}
          avatar={
            <Avatar>
              <School />
            </Avatar>
          }
          action={
            <div>
              <IconButton
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                style={{boxShadow:"1px 1px"}}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Delete</MenuItem>
              </Menu>
            </div>
          }
          title={item.school}
          subheader={
            <Typography color="textSecondary">
              <Moment format="MMM YYYY">{item.from}</Moment> -{" "}
              <Moment format="MMM YYYY">{item.to}</Moment>
            </Typography>
          }
        />
        <CardContent>
          {item.degree + ", " + item.fieldOfStudy}
          <Typography>{item.description}</Typography>
        </CardContent>
      </Card>
    ));
    return <div>{content}</div>;
  }
}

Education.propTypes = {
  educationList: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
