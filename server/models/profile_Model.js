const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type:String, 
    require: true
  }, 
  professionalStatus: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  githubUsername: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String], 
    required: true
  },
  bio: {
    type: String
  }, 
  _experience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  }],
  _education: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Education"
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
}, {timestamps: true});

module.exports = mongoose.model("Profile", ProfileSchema);