const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, "Email is required"],
    validate: {
      // email validator
      validator: function(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      },
      message: "Invalid E-mail format"
    }
  },
  name:{
    type: String,
    required: [true, "Name is required"]
  },
  password:{
    type: String,
    required: [true, "Password is required"]
  },
  avatar: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);
