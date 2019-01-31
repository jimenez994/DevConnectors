const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, "First name is required"],
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
  firstName:{
    type: String,
    required: [true, "First name is required"]
  },
  lastName:{
    type: String,
    required: [true, "Last name is required"]
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

const User = mongoose.model("User", UserSchema);
