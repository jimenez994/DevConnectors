const auth = require('../controllers/auth');
const profile = require('../controllers/profile')
const passport = require('passport');

module.exports = (app) => {
  // with auth routes can be assigned to become private
  const private = passport.authenticate("jwt", {session: false});

  // Auth
  app.post('/api/register', auth.register);
  app.post('/api/login', auth.login)
  app.get('/api/allUsers', private, auth.allUsers);

  // Profile
  app.get('/api/profile', private, profile.findProfile);
  app.post('/api/createOrUpdateProfile', private, profile.createOrUpdate);
  app.get('/api/profiles', profile.allProfiles)
} 