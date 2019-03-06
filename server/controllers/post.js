const mongoose = require("mongoose");
const post = mongoose.model("Post");
const postValidator = require("./../validation/post");
const isEmpty = require("./../validation/is-empty");

module.exports = {
  // Get all
  allPosts:(req, res) => {
    post.find()
      .then(result => {
        if(!isEmpty(result)){
          return res.status(200).json(result)
        }else{
          return res.status(400).json({posts: false})
        }
      })
      .catch(err=> {
        return res.status(400).json(err)
      })
  },
  // create 
  createPost: (req, res) => {
    const {errors, isValid} = postValidator(res.body);
    if(!isValid){
      return res.status(400).json(errors);
    }
    post.create(req.body)
      .then(result => {
        return res.status(200).json(result)
      })
      .catch(err => {
        return res.status(400).json({text:"Something went wrong"})
      })
  }
  // Delete post
  
}