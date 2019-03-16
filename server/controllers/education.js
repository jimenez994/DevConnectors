const mongoose = require("mongoose");
const education = mongoose.model("Education");
const profile = mongoose.model("Profile");
const educationValidator = require('./../validation/education');

module.exports = {
  addEducation: (req, res) => {
    const {errors, isValid} = educationValidator(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }
    profile
      .findOne({ _user: req.user._id })
      .then(userProfile => {
        education
          .create(req.body)
          .then(result => {
            userProfile._education.push(result);
            userProfile.save();
            return res.status(200).json(result);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    },
    deleteOne: (req, res) => {
      profile.update( {_user: req.user._id}, { $pull: {_education: [req.params.id] } } )
        .then(result => {
          education.deleteOne({_id:req.params.id})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
    }
};
