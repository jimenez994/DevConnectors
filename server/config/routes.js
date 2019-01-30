const auth = require('../controllers/auth')

module.exports = (app) => {
  app.post('/api/register', auth.register);
  app.get('/api/allUsers', auth.allUsers)
}