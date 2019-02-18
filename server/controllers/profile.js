const mongoose = require('mongoose');
const profile = mongoose.model('Profile');
const user = mongoose.model('User');
const profileValidator = require("./../validation/profile")
const isEmpty = require('./../validation/is-empty')

let opts = {runValidators: true}

module.exports = {
  findProfile: (req, res) => {
    profile.findOne({_user: req.user._id})
      .then(profile => {
        if(isEmpty(profile)){
          res.status(400).json({profile:false})
        }else{
          res.status(200).json(profile)
        }
      })
      .catch(err => res.status(400).json(err))
  },
  allProfiles: (req, res) => {
    profile.find().populate('_user','firstName lastName avatar').exec()
      .then(profiles => {
        return res.status(200).json(profiles)
      })
      .catch(err => {
        return res.status(400).json({profiles:"Not found"})
      })
  },
  createOrUpdate: (req, res) => {
    const {errors, isValid} = profileValidator(req.body);
    if(!isValid){
      return res.status(400).json(errors)
    }
    req.body._user = req.user._id
    // console.log(req.user._id, req.body);
    profile.findOne({_user: req.user._id})
      .then(result => {
        
        let str = req.body.skills;
        let skills = str.split(",");
        req.body.skills = skills;
        console.log(skills);
        // if user has a profile updated
        if(result){
          if(result.username !== req.body.username){
            profile.findOne({username: req.body.username})
              .then(otherProfile => {
                if(otherProfile){
                  return res.status(400).json({username: "Username is already in use"})
                }
              })
          }
            // console.log(req.body._id, req.body);
          profile.findOneAndUpdate({_id: req.body._id},req.body)
            .then(updatedProfile =>  {return res.status(200).json({update:"success"})})
            .catch(err => {
              return res.status(404).json(err) 
            })
        }else{
        // else create a profile 
          profile.create(req.body)
            .then(profile => {return res.json(profile)})
            .catch(err => {return res.json(err)})
        }
      })
  },
  
}