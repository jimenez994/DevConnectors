import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardContent, Chip, Typography } from "@material-ui/core";
import { Done } from "@material-ui/icons";

class Skills extends Component {
  render() {
    const { skills } = this.props;

    return (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Skills</Typography>
            {skills.map((skill,i)=> (
              <Chip
              key={i}
              color="primary"
              label={skill}
              icon={<Done/>}
              // clickable
              style={{margin:"3px"}}
            />
            ))}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Skills.propTypes = {
  skills: PropTypes.array.isRequired
};

export default Skills;
