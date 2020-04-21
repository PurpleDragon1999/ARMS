const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const database = require('./database/config');
const passportSetup=require("./config/passport-setup");
app.use(bodyParser.json());

app.use(cors({origin: '*'}));
//set up routes
require('./routes/index')(app);

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(3000, () => {
    console.log('Listening...')
  })