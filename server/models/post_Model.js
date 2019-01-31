const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  _user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    minlength: [8, "Must be at least 8 characters"]
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    _user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  comments: [{
    _user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    text: {
      type: String,
      minlength: [8, "Must be at least 8 characters"]
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  }]
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);