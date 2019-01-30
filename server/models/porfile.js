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
    required: [true, "Skills are required"]
  },
  bio: {
    type: String
  }, 
  experience: [{
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    company: {
      type: String,
      required: [true, "Company is required"]
    },
    locatrion:{
      type: String
    },
    from: {
      type: Date,
      required:[true, "Start date is required"]
    }, 
    to: {
      type: Date
    },
    current:{
      type: Boolean,
      default: false
    },
    description:{
      type: String
    }
  }],
  education: [{
    school: {
      type: String,
      required: [true, "School is required"]
    },
    degree: {
      type: String,
      required: [true, "Degree is required"]
    },
    fieldofstudy: {
      type: String,
      required: [true, "Field of study is required"]
    },
    from: {
      type: Date,
      required: [true, "Start date is required"]
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
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