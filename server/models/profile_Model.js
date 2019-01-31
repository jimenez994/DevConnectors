const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Username: {
    type:String, 
    require: [true, "Username is required"],
    minlength: [8, "Username must be at least 8 characters"]
  }, 
  ProfecionalStatus: {
    type: String
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
    required: [true, "Skills are required"],
    validate: {
      validator: function (value) {
        return value.length > 2
      },
      message: "Must at least be three skills"
    }
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