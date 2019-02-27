const mongoose = require("mongoose");
const profile = mongoose.model("Profile");
const profileValidator = require("./../validation/profile");
const isEmpty = require("./../validation/is-empty");

module.exports = {
  // Get profile by _id
  findProfile: (req, res) => {
    profile
      .findOne({ _user: req.user._id }).populate("_experience").populate("_education").exec()
      .then(profile => {
        if (isEmpty(profile)) {
          res.status(400).json({ profile: false });
        } else {
          res.status(200).json(profile);
        }
      })
      .catch(err => res.status(400).json(err));
  },
  // GET profile by username
  findProfileByUsername: (req, res) => {
    profile.findOne({username: req.params.username}).populate("_user", ['firstName', 'lastName']).exec()
    .then(result => res.status(200).json(result))
    .catch(err=> res.status(400).json(err))
  } ,
  // Get al profiles
  allProfiles: (req, res) => {
    profile
      .find({})
      .select("username skills location professionalStatus")
      .populate("_user", "firstName lastName avatar")
      .exec()
      .then(profiles => {
        return res.status(200).json(profiles);
      })
      .catch(err => {
        return res.status(400).json({ profiles: "Not found" });
      });
  },
  // create or update profile
  createOrUpdate: (req, res) => {
    const { errors, isValid } = profileValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    req.body._user = req.user._id;
    profile.findOne({ _user: req.user._id }).then(result => {
      let str = req.body.skills + "";
      let skills = str.split(",");
      req.body.skills = skills;
      // if user has a profile updated
      if (result) {
        if (result.username !== req.body.username) {
          profile
            .findOne({ username: req.body.username })
            .then(otherProfile => {
              if (otherProfile) {
                return res
                  .status(400)
                  .json({ username: "Username is already in use" });
              }
            });
        }
        profile
          .findOneAndUpdate({ _id: req.body._id }, req.body)
          .then(updatedProfile => {
            return res.status(200).json({ update: "success" });
          })
          .catch(err => {
            return res.status(404).json(err);
          });
      } else {
        // before createing profile check if username is taken 
        profile.findOne({ username: req.body.username }).then(otherProfile => {
          if (otherProfile) {
            return res
              .status(400)
              .json({ username: "Username is already in use" });
          } else {
            //create a profile
            profile
              .create(req.body)
              .then(profile => {
                return res.status(200).json(profile);
              })
              .catch(err => {
                return res.status(400).json(err);
              });
          }
        });
      }
    });
  }
};
