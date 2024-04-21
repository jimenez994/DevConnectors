import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Avatar,
  CardHeader,
  Typography,
  CardContent
} from "@material-ui/core";
import { Work } from "@material-ui/icons";
import Moment from "react-moment";

class Experience extends Component {
  render() {
    const { experienceArray } = this.props;
    let content = experienceArray.map(item => (
      <Card key={item._id} style={{ marginBottom: "10px" }}>
        <CardHeader
          style={{ paddingBottom: "0px" }}
          avatar={
            <Avatar>
              <Work />
            </Avatar>
          }
          title={item.title}
          subheader={
            <Typography color="textSecondary">
              <Moment format="MMM YYYY">{item.from}</Moment> -{" "}
              <Moment format="MMM YYYY">{item.to}</Moment>
            </Typography>
          }
        />
        <CardContent>
          {item.company}
          <Typography
            variant="body1"
            style={{ whiteSpace: "pre-line", marginTop: "5px" }}
          >{`${item.description}`}</Typography>
        </CardContent>
      </Card>
    ));
    return (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="subtitle2">Professional Experience</Typography>
          </CardContent>
        </Card>
        {content}
      </Grid>
    );
  }
}

Experience.propTypes = {
  experienceArray: PropTypes.array.isRequired
};

export default Experience;
