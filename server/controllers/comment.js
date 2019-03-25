const mongoose = require("mongoose");
// const comment = mongoose.model('Comment');
const user = mongoose.model("User");
const post = mongoose.model("Post");
const isEmpty = require("./../validation/is-empty");
const commentValidator = require("./../validation/comment");
module.exports = {
  createComment: (req, res) => {
    const { errors, isValid } = commentValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    post
      .findById({ _id: req.params.id })
      .then(result => {
          const newComment = {
            text: req.body.text,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            avatar: req.user.avatar,
            _user: req.user._id
          };
          result.comments.unshift(newComment);
          result.save().then(post => res.status(200).json(post));
          
      })
      .catch(err => {
        return res.status(400).json({ text: "Post not found" });
      });
  },
  deleteOne: (req, res) => {
    post.update({_id: req.params.postId}, {$pull: {_comments: [req.params.commentId]}})
      .then(result => {
        return res.status(200).json({postId: req.params.postId, commentId: req.params.commentId})
      })
      .catch(err => {
        return res.status(400).json({message: "Something went wrong while trying to delete the comment"})
      })
  }
};
