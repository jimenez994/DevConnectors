
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User= mongoose.model("User");
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id)
      .then(user => {
        if(user){
          return done(null, {_id: user._id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar})
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}