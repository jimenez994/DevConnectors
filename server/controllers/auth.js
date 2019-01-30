const mongoose = require("mongoose");
const User = mongoose.model('User');


module.exports = {
  register: (req, res) => {
    User.findOne({email: req.body.email})
      .then(result => {
        if(result){
          res.status(400).json({error: "Email already exists"})
        }else{
          User.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(405).json(err))
        }
      })
      .catch(err => res.status(405).json(err))
  },
  allUsers: (req, res) => {
    User.find()
      .then(result => res.json(result))
      .catch(err => res.json(err))
  }
}