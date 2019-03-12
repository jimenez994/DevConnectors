import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton, Collapse } from '@material-ui/core';
import { Favorite, Share, ExpandMore } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
  // card: {
  //   maxWidth: 400,
  // },
  // media: {
  //   height: 0,
  //   paddingTop: '56.25%', // 16:9
  // },
  // actions: {
  //   display: 'flex',
  // },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
});

class PostItem extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render () {
    const { classes } = this.props;
    const {post} = this.props;
    console.log(post);
    return (
      <Card style={{marginTop:"10px"}}>
       <CardHeader
          avatar={
            <Avatar  src={post.avatar}/>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={post.firstName +" " + post.lastName}
          subheader="September 14, 2016"
        />
        <CardContent style={{marginTop:"-23px"}}>
          <Typography>
            {post.text}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="Share">
            <Share />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

PostItem.propTypes = {
post: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostItem);