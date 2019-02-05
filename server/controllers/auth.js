const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const validateRegistrationInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

module.exports = {
  register: (req, res) => {
    const {errors, isValid} = validateRegistrationInput(req.body);
    if(!isValid){
      return res.status(400).json(errors)
    }
    User.findOne({email: req.body.email})
      .then(result => {
        if(result){
          return res.status(400).json({error: "Email already exists"})
        }else{
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          req.body.avatar = gravatar.url(req.body.email, {s: 200, r: "pg", d: "mm" })
          User.create(req.body)
            .then(user => {
              // this is what imformation you want to include in token generaten
              const payload = {_id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}
              // generating a token with the payload, type "Bearer", and expiration time "1h"
              jwt.sign(payload, keys.secretKey, {expiresIn: "1h"}, (err, token) => {
                return res.json({success: true, token : "Bearer " + token})
              })
            })
            .catch(errors => res.status(401).json(errors))
        }
      })
      .catch(errors => res.status(200).json(errors))
  },
  login: (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
      return res.status(400).json(errors)
    }
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
              if(isMatch){
                // this is what imformation you want to include in token generaten
                const payload = {_id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}
                // generating a token with the payload, type "Bearer", and expiration time "1h"
                jwt.sign(payload, keys.secretKey, {expiresIn: "1h"}, (err, token) => {
                res.json({success: true, token : "Bearer " + token})})
              }else{
                errors.password = "Password does not match"
                return res.status(400).json(errors)
              }
            })
        }else{
          errors.email = "Email not found"
          return res.status(400).json(errors)
        }
      })
      .catch(err => console.log(err))
  },

  allUsers: (req, res) => {
    User.find()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  }
}