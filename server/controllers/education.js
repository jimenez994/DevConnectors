const mongoose = require("mongoose");
const education = mongoose.model("Education");
const profile = mongoose.model("Profile");

module.exports = {
  addEducation: (req, res) => {
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
  }
};
