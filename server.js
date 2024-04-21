require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5002; 
const app = express();
const path = require('path');
const passport = require('passport')
const cors = require('cors');
const connectDB = require('./server/config/db')

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use(cors())

  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

// passport middleware
// ---------->>> the order matters!!! <<<-------------
// passport middleware
app.use(passport.initialize())
// passport config
require("./server/config/passport")(passport)
require("./server/config/routes")(app);


app.listen(port, () => {
  console.log(`Hey! you are in port ${port}`);
});