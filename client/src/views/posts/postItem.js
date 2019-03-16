import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  CardActions,
  IconButton,
  Collapse,
  MenuItem,
  Menu
} from "@material-ui/core";
import { Favorite, Share, ExpandMore, MoreVert } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost } from "actions/postActions";
import CommentForm from './../post/commentForm';

const styles = theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class PostItem extends Component {
  state = { commentExpanded: false, menuExpanded: null };

  handleExpandClick = () => {
    this.setState(state => ({ commentExpanded: !state.commentExpanded }));
  };
  handleMenuExpand = event => {
    this.setState({ menuExpanded: event.currentTarget });
  };
  deletePostItem = id => () => {
    this.props.deletePost(id);
    this.setState({ menuExpanded: null });
  };
  handleCloseMenu = () => {
    this.setState({ menuExpanded: null });
  };

  render() {
    const { classes } = this.props;
    const { post } = this.props;
    const { menuExpanded } = this.state;
    const { user } = this.props.auth;
    let sectionDeleteContent;
    if (user._id === post._user) {
      sectionDeleteContent = (
        <React.Fragment>
          <IconButton
            aria-owns={menuExpanded ? `${post._id}` : undefined}
            aria-haspopup="true"
            onClick={this.handleMenuExpand}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id={post._id}
            anchorEl={menuExpanded}
            open={Boolean(menuExpanded)}
            onClose={this.handleCloseMenu}
          >
            <MenuItem onClick={this.deletePostItem(post._id)}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      );
    }
    return (
      <Card style={{ marginTop: "10px" }}>
        <CardHeader
          avatar={<Avatar src={post.avatar} />}
          action={sectionDeleteContent}
          title={post.firstName + " " + post.lastName}
          subheader={<Moment format="MMM DD YYYY">{post.createdAt}</Moment>}
        />
        <CardContent style={{ marginTop: "-23px", marginBottom: "-20px" }}>
          <Typography>{post.text}</Typography>
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
              [classes.expandOpen]: this.state.commentExpanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.commentExpanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.commentExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentForm postId={post._id}/>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(
  mapStateToProps,
  { deletePost }
)(withStyles(styles)(PostItem));
