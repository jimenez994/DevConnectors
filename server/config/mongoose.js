const mongoose = require('mongoose');
const fs = require('fs');
const keys = require("./keys")

mongoose.connect(keys.mongoURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var models_path = __dirname + "/../models";
fs.readdirSync(models_path).forEach((file) => {
  if(file.includes('.js')){
    console.log("loading " + file + "...");
    require(models_path + "/" + file);
  }
})