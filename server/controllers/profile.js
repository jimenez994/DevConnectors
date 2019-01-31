const mongoose = require('mongoose');
const profile = mongoose.model('Profile');
const user = mongoose.model('User');

let opts = {runValidators: true}

module.exports = {
  findProfile: (req, res) => {
    profile.findOne({_user: req.params.id})
      .then(profile => res.json(profile))
      .catch(err => res.json(err))
  },
  createOrUpdate: (req, res) => {
    req.body._user = req.user._id
    profile.findOne({_user: req.user._id})
      .then(result => {
        // if user has a profile updated
        if(result){
          if(profile.username !== req.body.username){
            profile.findOne({username: req.body.username})
              .then(otherProfile => {
                if(otherProfile){
                  res.json({error: "Username is already in use"})
                }
              })
          }else{
            profile.findOneAndUpdate({_id: req.body._id},req.body, opts)
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