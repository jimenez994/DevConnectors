const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
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
}, {timestamps: true})

const Experience = mongoose.model("Experience", ExperienceSchema)