const mongoose = require('mongoose');
const profile = mongoose.model('Profile');
const user = mongoose.model('User');
const profileValidator = require("./../validation/profile")
const isEmpty = require('./../validation/is-empty')

let opts = {runValidators: true}

module.exports = {
  findProfile: (req, res) => {
    profile.findOne({_user: req.body._id})
      .then(profile => {
        if(isEmpty(profile)){
          res.status(400).json({profile:false})
        }else{
          res.status(200).json(profile)
        }
      })
      .catch(err => res.status(400).json(err))
  },
  createOrUpdate: (req, res) => {
    const {errors, isValid} = profileValidator(req.body);
    if(!isValid){
      return res.status(400).json(errors)
    }
    req.body._user = req.user._id
    profile.findOne({_user: req.user._id})
      .then(result => {
        // if user has a profile updated
        if(result){
          if(profile.username !== req.body.username){
            profile.findOne({username: req.body.username})
              .then(otherProfile => {
                if(otherProfile){
                  res.json({username: "Username is already in use"})
                }
              })
          }else{
            profile.findOneAndUpdate({_id: req.body._id},req.body)
              .then(updatedProfile => res.status(200).json({update:"success"}))
              .catch(err => res.status(404).json(err))
          }
        }else{
        // else create a profile 
          profile.create(req.body)
            .then(profile => res.json(profile))
            .catch(err => res.json(err))
        }
      })
      .catch(err => res.status(404).json(err))
  },
  
}