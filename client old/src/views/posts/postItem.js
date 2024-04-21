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
import CommentFeed from './../post/commentFeed';

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
            <CommentFeed comments={post.comments}/>
            <CommentForm postId={post._id}/>
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
