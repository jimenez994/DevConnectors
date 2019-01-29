const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000; 
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

require("./server/config/mongoose");
app.use(express.static('client/build'));

// passport middleware



require("./server/config/routes")(app);

app.listen(port, () => {
  console.log(`Hey! you are in port ${port}`);
});

