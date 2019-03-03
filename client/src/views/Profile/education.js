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
import { Work, School } from "@material-ui/icons";
import Moment from "react-moment";

class Education extends Component {

  render () {
    const { educationArray } = this.props;
    let content = educationArray.map(item => (
      <Card key={item._id} style={{ marginBottom: "10px" }}>
        <CardHeader
          style={{ paddingBottom: "0px" }}
          avatar={
            <Avatar>
              <School />
            </Avatar>
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
          {item.degree +" / "+ item.fieldOfStudy}
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
            <Typography variant="subtitle2">Education</Typography>
          </CardContent>
        </Card>
        {content}
      </Grid>
    );
  }
}

Education.propTypes = {
educationArray:  PropTypes.array.isRequired,
}

export default Education