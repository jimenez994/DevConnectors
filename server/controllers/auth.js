const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')


module.exports = {
  register: (req, res) => {
    User.findOne({email: req.body.email})
      .then(result => {
        if(result){
          res.status(400).json({error: "Email already exists"})
        }else{
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          req.body.avatar = gravatar.url(req.body.email, {s: 200, r: "pg", d: "mm" })
          User.create(req.body)
            .then(user => {
              // this is what imformation you want to include in token generaten
              const payload = {_id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}
              // generating a token with the payload, type "Bearer", and expiration time "1h"
              jwt.sign(payload, keys.secretKey, {expiresIn: "1h"}, (err, token) => {
                res.json({success: true, token : "Bearer " + token})
              })
            })
            .catch(err => res.status(405).json(err))
        }
      })
      .catch(err => res.status(405).json(err))
  },
  login: (req, res) => {
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
                res.status(400).json({error: "Password does not match"})
              }
            })
        }else{
          res.status(400).json({error: "Email not found 1"})
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