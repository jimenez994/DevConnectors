const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location:{
    type: String
  },
  from: {
    type: Date,
    required:true
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

module.exports = mongoose.model("Experience", ExperienceSchema)