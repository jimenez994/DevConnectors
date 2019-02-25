const mongoose = require("mongoose");
const experience = mongoose.model("Experience");
const profile = mongoose.model("Profile");
const experienceValidator = require('./../validation/experience');

module.exports = {
  addExperience: (req, res) => {
    const {errors, isValid} = experienceValidator(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }
    profile
      .findOne({ _user: req.user._id })
      .then(userProfile => {
        experience
          .create(req.body)
          .then(result => {
            userProfile._experience.push(result);
            userProfile.save();
            return res.status(200).json(result);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    },
    deleteOne: (req, res) => {
      profile.update( {_user: req.user._id}, { $pull: {_experience: [req.params.id] } } )
        .then(result => {
          console.log(result);
          experience.deleteOne({_id:req.params.id})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
    }
};
