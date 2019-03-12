const mongoose = require("mongoose");
const post = mongoose.model("Post");
const user = mongoose.model("User");
const postValidator = require("./../validation/post");
const isEmpty = require("./../validation/is-empty");

module.exports = {
  // Get all
  allPosts: (req, res) => {
    post
      .find()
      .then(result => {
        if (!isEmpty(result)) {
          return res.status(200).json(result.reverse());
        } else {
          return res.status(400).json({ posts: false });
        }
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  },
  // create
  createPost: (req, res) => {
    const { errors, isValid } = postValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    user.find({ _id: req.user._id }).then(result => {
      if (isEmpty(result)) {
        return res
          .status(400)
          .json({ text: "It looks like you are not logged in" });
      } else {
        req.body.firstName = req.user.firstName;
        req.body.lastName = req.user.lastName;
        req.body.avatar = req.user.avatar;
        post
          .create(req.body)
          .then(result => {
            return res.status(200).json(result);
          })
          .catch(err => {
            return res
              .status(400)
              .json({
                text: "Something went wrong while trying to create a new post"
              });
          });
      }
    });
  }
  // Delete post
};
