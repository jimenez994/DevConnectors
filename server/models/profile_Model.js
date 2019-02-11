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
  profecionalStatus: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
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
  experience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  }],
  education: [{
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

const Profile = mongoose.model("Profile", ProfileSchema);