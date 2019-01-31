const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
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
}, {timestamps: true})

const Education = mongoose.model("Education", EducationSchema)