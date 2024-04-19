const mongoose = require('mongoose');
const fs = require('fs');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

// mongoose.connect(keys.mongoURL, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
connectDB()

var models_path = __dirname + "/../models";
fs.readdirSync(models_path).forEach((file) => {
  if(file.includes('.js')){
    console.log("loading " + file + "...");
    require(models_path + "/" + file);
  }
})